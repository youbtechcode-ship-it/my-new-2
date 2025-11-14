'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { brandSchema } from '@/lib/schemas';
import { submitBrandForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormProps {
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BrandForm({ setOpen }: BrandFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
        brandName: '',
        contactPerson: '',
        workEmail: '',
        mobileNumber: '',
        campaignDescription: '',
        productLink: '',
        estimatedBudget: '',
        deadline: '',
    },
  });

  const onSubmit = (data: BrandFormValues) => {
    startTransition(async () => {
      const result = await submitBrandForm(data);
      if (result.success) {
        toast({ title: 'Success!', description: result.message });
        form.reset();
        setOpen(false);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="brandName" render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl><Input placeholder="Awesome Inc." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="contactPerson" render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="workEmail" render={({ field }) => (
            <FormItem>
              <FormLabel>Work Email</FormLabel>
              <FormControl><Input placeholder="jane.s@awesome.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="mobileNumber" render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        
        <FormField control={form.control} name="campaignDescription" render={({ field }) => (
            <FormItem>
                <FormLabel>Campaign Description</FormLabel>
                <FormControl><Textarea placeholder="Describe your campaign goals, target audience, and key messages." rows={4} {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <FormField control={form.control} name="productLink" render={({ field }) => (
            <FormItem>
                <FormLabel>Product Link</FormLabel>
                <FormControl><Input placeholder="https://yourproduct.com" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="estimatedBudget" render={({ field }) => (
                <FormItem>
                    <FormLabel>Estimated Budget (USD)</FormLabel>
                    <FormControl><Input placeholder="$5,000" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="deadline" render={({ field }) => (
                <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl><Input placeholder="e.g., 3-4 weeks" {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>

        <FormItem>
            <FormLabel>File Upload (optional)</FormLabel>
            <FormControl><Input type="file" disabled /></FormControl>
            <FormDescription>Campaign brief, media kit, etc. File uploads are currently disabled.</FormDescription>
        </FormItem>
        
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Request
        </Button>
      </form>
    </Form>
  );
}
