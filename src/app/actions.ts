'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { analyzeLeadQuality } from '@/ai/flows/analyze-lead-quality';
import { subscriberSchema, freelancerSchema, brandSchema } from '@/lib/schemas';

type FormState = {
  success: boolean;
  message: string;
};

export async function submitSubscriberForm(
  data: z.infer<typeof subscriberSchema>
): Promise<FormState> {
  try {
    const validatedData = subscriberSchema.parse(data);
    await addDoc(collection(db, 'submissions'), {
      ...validatedData,
      type: 'subscriber',
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
    const validatedData = freelancerSchema.parse(data);

    const aiAnalysis = await analyzeLeadQuality({
      leadData: JSON.stringify(validatedData),
      leadType: 'freelancer',
    });

    await addDoc(collection(db, 'submissions'), {
      ...validatedData,
      type: 'freelancer',
      submittedAt: serverTimestamp(),
      aiAnalysis,
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

export async function submitBrandForm(
  data: z.infer<typeof brandSchema>
): Promise<FormState> {
  try {
    const validatedData = brandSchema.parse(data);

    const aiAnalysis = await analyzeLeadQuality({
        leadData: JSON.stringify(validatedData),
        leadType: 'brand',
    });

    await addDoc(collection(db, 'submissions'), {
      ...validatedData,
      type: 'brand',
      submittedAt: serverTimestamp(),
      aiAnalysis,
    });
    return {
      success: true,
      message: 'Your collaboration request has been submitted. You will be contacted soon.',
    };
  } catch (error) {
    console.error('Error submitting brand form:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }
}
