'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { subscriberSchema, freelancerSchema, brandSchema } from '@/lib/schemas';

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
