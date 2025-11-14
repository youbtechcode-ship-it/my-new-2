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

async function sendCollaborationEmail(data: z.infer<typeof brandSchema>) {
  const { 
    brandName, contactPerson, workEmail, productLink, videoType, productType, 
    description, platforms, estimatedBudget, country, paymentMethod 
  } = data;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailHtml = `
    <h1>New Brand Collaboration Inquiry</h1>
    <p><strong>Brand Name:</strong> ${brandName}</p>
    <p><strong>Contact Person:</strong> ${contactPerson}</p>
    <p><strong>Work Email:</strong> ${workEmail}</p>
    <p><strong>Product Link:</strong> <a href="${productLink}">${productLink}</a></p>
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
    from: `"${brandName}" <${process.env.SMTP_SENDER}>`,
    to: process.env.EMAIL_RECIPIENT,
    subject: `New Collaboration Inquiry from ${brandName}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Collaboration email sent successfully');
  } catch (error) {
    console.error('Error sending collaboration email:', error);
    // We don't want to fail the whole submission if the email fails, so we just log the error.
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

    // Send email in the background
    sendCollaborationEmail(validatedData);

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
