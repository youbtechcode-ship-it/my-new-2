'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { freelancerSchema } from '@/lib/schemas';
import { submitFreelancerForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const skills = [
  { id: 'editing', label: 'Editing' },
  { id: 'thumbnails', label: 'Thumbnails' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'flutter', label: 'Flutter Widgets' },
  { id: 'script-writing', label: 'Script Writing' },
  { id: 'micro-tasks', label: 'Micro-tasks' },
];

type FreelancerFormValues = z.infer<typeof freelancerSchema>;

export default function FreelancerForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FreelancerFormValues>({
    resolver: zodResolver(freelancerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      portfolioLink: '',
      skills: [],
      experience: '',
      description: '',
    },
  });

  const onSubmit = (data: FreelancerFormValues) => {
    startTransition(async () => {
      const result = await submitFreelancerForm(data);
      if (result.success) {
        toast({ title: 'Success!', description: result.message });
        form.reset();
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl><Input placeholder="+1 234 567 890" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="portfolioLink" render={({ field }) => (
                <FormItem>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl><Input placeholder="https://yourportfolio.com" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )} />
        </div>
        
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Skills</FormLabel>
                <FormDescription>Select all skills that apply.</FormDescription>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="skills"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField control={form.control} name="experience" render={({ field }) => (
            <FormItem>
                <FormLabel>Experience</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Beginner (0-1 years)">Beginner (0-1 years)</SelectItem>
                        <SelectItem value="Intermediate (1-3 years)">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="Advanced (3-5 years)">Advanced (3-5 years)</SelectItem>
                        <SelectItem value="Expert (5+ years)">Expert (5+ years)</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
        
        <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Tell us about yourself, your skills, and why you'd be a good fit." rows={5} {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        
        <FormItem>
            <FormLabel>File Upload (optional)</FormLabel>
            <FormControl><Input type="file" disabled /></FormControl>
            <FormDescription>Resume, CV, or sample work. File uploads are currently disabled.</FormDescription>
        </FormItem>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Application
        </Button>
      </form>
    </Form>
  );
}
