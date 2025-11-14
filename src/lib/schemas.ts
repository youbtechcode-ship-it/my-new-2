import { z } from 'zod';

export const subscriberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  whatsappNumber: z.string().min(10, 'Please enter a valid WhatsApp number.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export const freelancerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  mobileNumber: z.string().min(10, 'Please enter a valid mobile number.'),
  portfolioLink: z.string().url('Please enter a valid URL.'),
  skills: z.array(z.string()).nonempty({ message: 'Please select at least one skill.' }),
  experience: z.string().min(1, 'Please specify your experience level.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

export const brandSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters.'),
  contactPerson: z.string().min(2, 'Contact person must be at least 2 characters.'),
  workEmail: z.string().email('Please enter a valid work email.'),
  mobileNumber: z.string().min(10, 'Please enter a valid mobile number.'),
  campaignDescription: z.string().min(20, 'Description must be at least 20 characters.'),
  productLink: z.string().url('Please enter a valid product link.'),
  estimatedBudget: z.string().min(1, 'Please provide an estimated budget.'),
  deadline: z.string().min(1, 'Please provide a deadline.'),
});
