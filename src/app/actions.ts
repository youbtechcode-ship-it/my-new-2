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

export async function submitSubscriberForm(
  data: z.infer<typeof subscriberSchema>
): Promise<FormState> {
  try {
    const { firestore } = initializeFirebase();
    const validatedData = subscriberSchema.parse(data);
    await addDoc(collection(firestore, 'subscribers'), {
      ...validatedData,
      submittedAt: serverTimestamp(),
    });
    return { success: true, message: 'Thank you! Your message has been delivered.' };
  } catch (error) {
    console.error('Error submitting subscriber form:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
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
      submittedAt: serverTimestamp(),
    });
    return {
      success: true,
      message: 'Your application is received. You may get work within 24–72 hours if shortlisted.',
    };
  } catch (error) {
    console.error('Error submitting freelancer form:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendCollaborationEmailToAdmin(data: z.infer<typeof brandSchema>) {
  const { 
    brandName, contactPerson, workEmail, productLink, videoType, productType, 
    description, platforms, estimatedBudget, country, paymentMethod 
  } = data;

  const emailHtml = `
    <h1>New Brand Collaboration Inquiry</h1>
    <p><strong>Brand Name:</strong> ${brandName}</p>
    <p><strong>Contact Person:</strong> ${contactPerson}</p>
    <p><strong>Work Email:</strong> ${workEmail}</p>
    <p><strong>Product Link:</strong> <a href="${productLink}">${productLink || 'N/A'}</a></p>
    <hr>
    <h2>Campaign Details</h2>
    <p><strong>Video Type:</strong> ${videoType}</p>
    <p><strong>Product Type:</strong> ${productType}</p>
    <p><strong>Platforms:</strong> ${platforms.join(', ')}</p>
    <p><strong>Description:</strong> ${description || 'N/A'}</p>
    <hr>
    <h2>Budget & Logistics</h2>
    <p><strong>Estimated Budget:</strong> $${estimatedBudget}</p>
    <p><strong>Country:</strong> ${country}</p>
    <p><strong>Payment Method:</strong> ${paymentMethod}</p>
  `;

  const mailOptions = {
    from: `"YBT Connect" <${process.env.SMTP_SENDER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `New Collaboration Inquiry from ${brandName}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Collaboration email to admin sent successfully');
  } catch (error) {
    console.error('Error sending collaboration email to admin:', error);
    throw error;
  }
}

async function sendConfirmationToBrand(data: z.infer<typeof brandSchema>) {
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
        from: `"You B Tech" <${process.env.SMTP_SENDER}>`,
        to: workEmail,
        subject: 'Your Collaboration Inquiry with You B Tech has been Received',
        html: confirmationHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent to brand successfully');
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
    const validatedData = brandSchema.parse(data);

    await addDoc(collection(firestore, 'brand_collaborations'), {
      ...validatedData,
      submittedAt: serverTimestamp(),
    });

    // Send emails in parallel
    await Promise.all([
      sendCollaborationEmailToAdmin(validatedData),
      sendConfirmationToBrand(validatedData)
    ]);

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
