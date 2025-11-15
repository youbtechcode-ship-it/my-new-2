
'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { subscriberSchema, freelancerSchema, brandSchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';

type FormState = {
  success: boolean;
  message: string;
};

// Check if SMTP is configured
const isSmtpConfigured = !!process.env.SMTP_HOST && !!process.env.SMTP_USER && !!process.env.SMTP_PASS;

// This transport should be configured with your email provider's details.
// For now, it uses environment variables which you would need to set up.
const transporter = isSmtpConfigured ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}) : null;

// --- SUBSCRIBER ACTIONS ---

async function sendSubscriberEmailToAdmin(data: z.infer<typeof subscriberSchema>) {
  if (!transporter) {
    console.warn("SMTP not configured, skipping admin email for subscriber.");
    return;
  }
  const { name, whatsappNumber, message, messageType } = data;

  const emailHtml = `
    <h1>New Subscriber Message</h1>
    <p>A new message has been submitted through the connect form.</p>
    <hr>
    <h2>Details:</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>WhatsApp Number:</strong> ${whatsappNumber}</p>
    <p><strong>Message Type:</strong> ${messageType}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const mailOptions = {
    from: `"YBT Connect" <${process.env.SMTP_SENDER || 'noreply@example.com'}>`,
    to: "youbtechcode@gmail.com",
    subject: `[Subscriber - ${messageType}] New Message from ${name}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending subscriber email to admin:', error);
    // Non-critical, so we don't throw and fail the whole process
  }
}

export async function submitSubscriberForm(
  data: z.infer<typeof subscriberSchema>
): Promise<FormState> {
  try {
    const { firestore } = initializeFirebase();
    const validatedData = subscriberSchema.parse(data);

    await addDoc(collection(firestore, 'subscribers'), {
      ...validatedData,
      submissionDate: serverTimestamp(),
    });
    
    if (isSmtpConfigured) {
        await sendSubscriberEmailToAdmin(validatedData);
    }
    
    return { success: true, message: 'Thank you! Your message has been delivered.' };
  } catch (error) {
    console.error('Error submitting subscriber form:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', '),
      };
    }
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}


// --- FREELANCER ACTIONS ---

async function sendFreelancerEmailToAdmin(data: z.infer<typeof freelancerSchema>) {
    if (!transporter) {
      console.warn("SMTP not configured, skipping admin email for freelancer.");
      return;
    }
    const { fullName, email, mobileNumber, portfolioLink, skills, experience, description } = data;

    const emailHtml = `
        <h1>New Freelancer Application</h1>
        <p>A new freelancer has applied to work with you.</p>
        <hr>
        <h2>Applicant Details:</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobileNumber}</p>
        <p><strong>Portfolio:</strong> <a href="${portfolioLink}">${portfolioLink}</a></p>
        <hr>
        <h2>Application Details:</h2>
        <p><strong>Skills:</strong> ${skills.join(', ')}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
    `;

    const mailOptions = {
        from: `"YBT Connect" <${process.env.SMTP_SENDER || 'noreply@example.com'}>`,
        to: "youbtechcode@gmail.com",
        subject: `[Freelancer] New Application from ${fullName}`,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending freelancer email to admin:', error);
        // We will not throw an error, to allow the process to continue
    }
}

async function sendConfirmationToFreelancer(data: z.infer<typeof freelancerSchema>) {
    if (!transporter) {
      console.warn("SMTP not configured, skipping confirmation email to freelancer.");
      return;
    }
    const { fullName, email } = data;

    const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Your Application to Work with You B Tech has been Received!</h2>
            <p>Hello ${fullName},</p>
            <p>Thank you for applying to join our network of talented freelancers. We have successfully received your application.</p>
            <p>Our team will review your portfolio and experience. If your skills match our current needs, we will contact you within <strong>24-72 hours</strong> regarding next steps.</p>
            <p>We appreciate your interest in collaborating with us!</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Brajendra</strong></p>
            <p>Creator, You B Tech</p>
        </div>
    `;

    const mailOptions = {
        from: `"You B Tech" <${process.env.SMTP_SENDER || 'noreply@example.com'}>`,
        to: email,
        subject: 'We Have Received Your Freelancer Application',
        html: confirmationHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending confirmation email to freelancer:', error);
        // Do not throw, as admin notification is more critical. We can still proceed.
    }
}


export async function submitFreelancerForm(
  data: z.infer<typeof freelancerSchema>
): Promise<FormState> {
  try {
    const { firestore } = initializeFirebase();
    const validatedData = freelancerSchema.parse(data);

    await addDoc(collection(firestore, 'freelancers'), {
      ...validatedData,
      submissionDate: serverTimestamp(),
    });

    if (isSmtpConfigured) {
        await Promise.all([
            sendFreelancerEmailToAdmin(validatedData),
            sendConfirmationToFreelancer(validatedData)
        ]);
    }

    return {
      success: true,
      message: 'Your application is received. You may get work within 24–72 hours if shortlisted.',
    };
  } catch (error) {
    console.error('Error submitting freelancer form:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
    return { success: false, message: errorMessage };
  }
}


// --- BRAND ACTIONS ---

async function sendCollaborationEmailToAdmin(data: z.infer<typeof brandSchema>) {
  if (!transporter) {
      console.warn("SMTP not configured, skipping admin email for brand collab.");
      return;
    }

  const { 
    brandName, contactPerson, workEmail, productLink, videoType, productType, 
    description, platforms, estimatedBudget, country, paymentMethod 
  } = data;

  const emailHtml = `
    <h1>New Brand Collaboration Inquiry</h1>
    <p>A new brand has submitted an inquiry for collaboration.</p>
    <hr>
    <h2>Brand Details:</h2>
    <p><strong>Brand Name:</strong> ${brandName}</p>
    <p><strong>Contact Person:</strong> ${contactPerson}</p>
    <p><strong>Work Email:</strong> ${workEmail}</p>
    <p><strong>Product Link:</strong> <a href="${productLink}">${productLink || 'N/A'}</a></p>
    <hr>
    <h2>Campaign Details:</h2>
    <p><strong>Video Type:</strong> ${videoType}</p>
    <p><strong>Product Type:</strong> ${productType}</p>
    <p><strong>Platforms:</strong> ${platforms.join(', ')}</p>
    <p><strong>Description:</strong> ${description || 'N/A'}</p>
    <hr>
    <h2>Budget & Logistics:</h2>
    <p><strong>Estimated Budget:</strong> $${estimatedBudget}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
  `;

  const mailOptions = {
    from: `"YBT Connect" <${process.env.SMTP_SENDER || 'noreply@example.com'}>`,
    to: "youbtechcode@gmail.com",
    subject: `[Brand] New Collaboration Inquiry from ${brandName}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending collaboration email to admin:', error);
    // We will not throw an error
  }
}

async function sendConfirmationToBrand(data: z.infer<typeof brandSchema>) {
    if (!transporter) {
      console.warn("SMTP not configured, skipping confirmation email to brand.");
      return;
    }
    const { brandName, workEmail, contactPerson } = data;

    const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Thank You for Your Interest in Collaborating with You B Tech!</h2>
            <p>Hello ${contactPerson},</p>
            <p>We have successfully received your collaboration inquiry for <strong>${brandName}</strong>. We appreciate you considering us for your campaign.</p>
            <p>Our team will review the details you provided and get back to you within 24-48 hours with a formal proposal or any follow-up questions.</p>
            <p>In the meantime, feel free to browse our <a href="https://youtube.com/@you_b_tech">YouTube channel</a> to see more of our work.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>Brajendra</strong></p>
            <p>Creator, You B Tech</p>
        </div>
    `;

    const mailOptions = {
        from: `"You B Tech" <${process.env.SMTP_SENDER || 'noreply@example.com'}>`,
        to: workEmail,
        subject: 'Your Collaboration Inquiry with You B Tech has been Received',
        html: confirmationHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending confirmation email to brand:', error);
        // We don't want to fail the whole submission if this email fails, so we just log the error.
    }
}


export async function submitBrandForm(
  data: z.infer<typeof brandSchema>
): Promise<FormState> {
  try {
    const { firestore } = initializeFirebase();
    
    // Ensure estimatedBudget is a number before validation
    const dataWithNumericBudget = {
      ...data,
      estimatedBudget: Number(data.estimatedBudget),
    };

    const validatedData = brandSchema.parse(dataWithNumericBudget);

    await addDoc(collection(firestore, 'brand_collaborations'), {
      ...validatedData,
      submissionDate: serverTimestamp(),
    });

    if (isSmtpConfigured) {
        await Promise.all([
          sendCollaborationEmailToAdmin(validatedData),
          sendConfirmationToBrand(validatedData)
        ]);
    }

    return {
      success: true,
      message: 'Your collaboration request has been submitted. You will be contacted soon.',
    };
  } catch (error) {
    console.error('Error submitting brand form:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', '),
      };
    }
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
    return { success: false, message: errorMessage };
  }
}
