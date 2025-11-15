
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { brandSchema } from '@/lib/schemas';
import { submitBrandForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Info, ArrowLeft, ArrowRight, Check, Briefcase, DollarSign, FileText, Send, User, AlertTriangle, Sparkles, Home } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { countries } from '@/lib/countries';
import ReactConfetti from 'react-confetti';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Dispatch, SetStateAction } from 'react';
import { BrandTerms, BrandPrivacy } from '@/lib/legal';
import LegalModal from './LegalModal';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

type BrandFormValues = z.infer<typeof brandSchema>;

interface BrandFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const steps = [
  { id: 'Step 1', name: 'Brand Details', fields: ['brandName', 'contactPerson', 'workEmail', 'productLink'], icon: User },
  { id: 'Step 2', name: 'Overview', fields: ['videoType', 'productType', 'platforms', 'description'], icon: Briefcase },
  { id: 'Step 3', name: 'Assets', fields: ['assetsLink', 'keywords'], icon: FileText },
  { id: 'Step 4', name: 'Budget', fields: ['estimatedBudget', 'country', 'paymentMethod'], icon: DollarSign },
  { id: 'Step 5', name: 'Submit', fields: ['termsAgreed'], icon: Send },
];

const SubmissionSuccessDialog = ({ open, onRedirect }: { open: boolean, onRedirect: () => void }) => {
    const [progress, setProgress] = useState(10);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (open) {
            setProgress(10);
            setCountdown(10);
            
            const progressTimer = setInterval(() => {
                setProgress(prev => (prev < 100 ? prev + 10 : 100));
            }, 100);

            const countdownTimer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            const redirectTimer = setTimeout(onRedirect, 10000);

            return () => {
                clearInterval(progressTimer);
                clearInterval(countdownTimer);
                clearTimeout(redirectTimer);
            };
        }
    }, [open, onRedirect]);

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center font-headline">Congratulations!</DialogTitle>
                </DialogHeader>
                <div className="text-center space-y-4">
                    <p className="text-muted-foreground">Your collaboration inquiry has been successfully submitted.</p>
                    <div className="w-full bg-muted rounded-full h-2.5">
                       <Progress value={progress} className="w-full" />
                    </div>
                    <p className="text-sm text-muted-foreground">A confirmation and a copy of your inquiry have been sent to your email.</p>
                </div>
                 <Button onClick={onRedirect}>
                    <Home className="mr-2 h-4 w-4" /> Go to Home ({countdown}s)
                </Button>
            </DialogContent>
        </Dialog>
    );
};


export default function BrandForm({ setOpen }: BrandFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    mode: 'onTouched',
    defaultValues: {
      brandName: '',
      contactPerson: '',
      workEmail: '',
      productLink: '',
      videoType: 'dedicated',
      productType: 'digital',
      description: '',
      platforms: [],
      assetsLink: '',
      keywords: '',
      estimatedBudget: 300,
      country: '',
      paymentMethod: 'upi',
      termsAgreed: false,
    },
  });

  const { watch } = form;
  const budget = watch('estimatedBudget');
  const [budgetTier, budgetProgress] = getBudgetTier(budget);

  const handleRedirect = () => {
    setShowSuccessDialog(false);
    setOpen(false);
    router.push('/brand');
  };

  async function processSubmit(data: BrandFormValues) {
    startTransition(async () => {
      const result = await submitBrandForm(data);
      if (result.success) {
        toast({ title: 'Success!', description: result.message });
        setShowConfetti(true);
        generatePdf(data);
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 6000);
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
      }
    });
  }

  type FieldName = keyof BrandFormValues;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
       setCurrentStep(step => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  function getBudgetTier(budget: number): [string, number] {
    if (budget < 500) return ["⚠️ Starter Collaboration", (budget / 500) * 25];
    if (budget < 800) return ["👍 Standard Collaboration", 25 + ((budget - 500) / 300) * 25];
    if (budget < 1000) return ["💼 Premium Collaboration", 50 + ((budget - 800) / 200) * 25];
    return ["💎 Elite Collaboration", 75 + Math.min(25, ((budget - 1000) / 500) * 25)];
  }

 const generatePdf = (data: BrandFormValues) => {
    const doc = new jsPDF();
    const inquiryId = `YBT-${Date.now()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const pageHeight = doc.internal.pageSize.height;

    // Header
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Collaboration Inquiry", 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("You B Tech", 20, 30);
    doc.text("Digital Content & Brand Partnerships", 20, 35);
    doc.text("youbtechcode@gmail.com", 20, 40);

    doc.text(`Inquiry ID: ${inquiryId}`, 190, 30, { align: 'right' });
    doc.text(`Date: ${submissionDate}`, 190, 35, { align: 'right' });
    
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 45, 195, 45);

    // Bill To Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("INQUIRY FROM (CLIENT)", 20, 55);
    doc.setFont('helvetica', 'normal');
    doc.text(data.brandName, 20, 60);
    doc.text(data.contactPerson, 20, 65);
    doc.text(data.workEmail, 20, 70);
    doc.text(data.country, 20, 75);

    // Table of services
    const tableData = [
        ['Video Type', data.videoType.charAt(0).toUpperCase() + data.videoType.slice(1)],
        ['Product Type', data.productType.charAt(0).toUpperCase() + data.productType.slice(1)],
        ['Target Platforms', data.platforms.join(', ').replace(/\b\w/g, l => l.toUpperCase())],
        ['Campaign Description', data.description || 'N/A'],
        ['Brand/Product URL', data.productLink || 'N/A'],
    ];

    (doc as any).autoTable({
        startY: 85,
        head: [['Service Description', 'Details']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [22, 163, 74] },
        styles: { fontSize: 9, cellPadding: 2.5 },
        columnStyles: { 0: { fontStyle: 'bold' } },
        didDrawPage: (data: any) => {
            // This ensures subsequent pages have footers too if the table is long
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Inquiry ID: ${inquiryId}`, data.settings.margin.left, pageHeight - 10);
            doc.text('This is a preliminary inquiry, not a binding contract.', 105, pageHeight - 10, { align: 'center' });
            doc.text(`Page ${data.pageNumber}`, 195, pageHeight - 10, { align: 'right' });
        }
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Budget & Payment Summary
    const budgetX = 130;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Estimated Budget (USD)', budgetX, finalY + 15);
    doc.setFont('helvetica', 'normal');
    doc.text(`$${data.estimatedBudget.toLocaleString()}`, 195, finalY + 15, { align: 'right' });
    
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Method', budgetX, finalY + 22);
    doc.setFont('helvetica', 'normal');
    doc.text(data.paymentMethod.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), 195, finalY + 22, { align: 'right' });

    doc.setDrawColor(220, 220, 220);
    doc.line(budgetX - 5, finalY + 27, 195, finalY + 27);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL ESTIMATE', budgetX, finalY + 34);
    doc.text(`$${data.estimatedBudget.toLocaleString()}`, 195, finalY + 34, { align: 'right' });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text('Thank you for your interest in collaborating with You B Tech. We will review your inquiry and respond within 48 hours.', 105, pageHeight - 20, { align: 'center' });

    doc.save(`YBT_Inquiry_${data.brandName.replace(/\s+/g, '_')}_${inquiryId}.pdf`);
  };

  return (
    <FormProvider {...form}>
      {showConfetti && typeof window !== 'undefined' && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      <SubmissionSuccessDialog open={showSuccessDialog} onRedirect={handleRedirect} />
      
      <div className="p-1">
        {/* Progress Bar */}
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-primary transition-colors "><step.icon className="inline-block w-4 h-4 mr-2" />{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                    <span className="text-sm font-medium text-primary"><step.icon className="inline-block w-4 h-4 mr-2" />{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors"><step.icon className="inline-block w-4 h-4 mr-2" />{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Form Content */}
        <form className="mt-8" onSubmit={form.handleSubmit(processSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {currentStep === 0 && <Step1 />}
              {currentStep === 1 && <Step2 />}
              {currentStep === 2 && <Step3 />}
              {currentStep === 3 && <Step4 budgetTier={budgetTier} budgetProgress={budgetProgress} />}
              {currentStep === 4 && <Step5 />}
            </motion.div>
          </AnimatePresence>
        </form>

        {/* Navigation */}
        <div className="mt-8 pt-5">
          <div className="flex justify-between">
            <Button onClick={prev} type="button" variant="outline" disabled={currentStep === 0 || isPending}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={next} disabled={isPending}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             ) : (
                <Button
                    type="button"
                    onClick={form.handleSubmit(processSubmit)}
                    disabled={isPending || !form.formState.isValid}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                       'Confirm & Submit'
                    )}
                </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

const Step1 = () => (
  <div className="space-y-4">
    <FormField control={useFormContext().control} name="brandName" render={({ field }) => (
      <FormItem>
        <FormLabel>Brand / Company Name</FormLabel>
        <FormControl><Input placeholder="e.g., Tech Innovations Inc." {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField control={useFormContext().control} name="contactPerson" render={({ field }) => (
      <FormItem>
        <FormLabel>Your Full Name</FormLabel>
        <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
    <FormField control={useFormContext().control} name="workEmail" render={({ field }) => (
      <FormItem>
        <FormLabel>Work Email Address</FormLabel>
        <FormControl><Input placeholder="you@company.com" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
     <FormField control={useFormContext().control} name="productLink" render={({ field }) => (
      <FormItem>
        <FormLabel>Brand Website / Product URL (Optional)</FormLabel>
        <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </div>
);

const Step2 = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField control={useFormContext().control} name="videoType" render={({ field }) => (
        <FormItem>
            <FormLabel>Video Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
                <SelectTrigger>
                <SelectValue placeholder="Select video type" />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                <SelectItem value="dedicated">Dedicated Video</SelectItem>
                <SelectItem value="integrated">Integrated Segment</SelectItem>
                <SelectItem value="shorts">Shorts</SelectItem>
            </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
        )} />
        <FormField control={useFormContext().control} name="productType" render={({ field }) => (
            <FormItem>
                <FormLabel>Product Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )} />
    </div>
     <FormField control={useFormContext().control} name="description" render={({ field }) => (
        <FormItem>
            <FormLabel>Description/Requirement (Optional)</FormLabel>
            <FormControl><Textarea placeholder="Describe the product, key features to highlight, or any specific requirements for the video." {...field} /></FormControl>
            <FormMessage />
        </FormItem>
    )} />
    <FormField
      control={useFormContext().control}
      name="platforms"
      render={() => (
        <FormItem>
          <FormLabel>Platforms</FormLabel>
          <div className="space-y-2">
            {[
              { id: 'youtube', label: 'YouTube' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'telegram', label: 'Telegram', note: '(Free with YouTube)' },
            ].map(item => (
              <FormField
                key={item.id}
                control={useFormContext().control}
                name="platforms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          return checked
                            ? field.onChange([...currentValue, item.id])
                            : field.onChange(currentValue.filter((value: string) => value !== item.id));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label} {item.note && <span className="text-muted-foreground text-xs">{item.note}</span>}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

const Step3 = () => (
    <div className="space-y-4">
        <FormField control={useFormContext().control} name="assetsLink" render={({ field }) => (
            <FormItem>
                <FormLabel>Creative Assets Link (Optional)</FormLabel>
                <FormControl><Input placeholder="Google Drive, Dropbox, etc." {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={useFormContext().control} name="keywords" render={({ field }) => (
            <FormItem>
                <FormLabel>Specific Keywords (Optional)</FormLabel>
                <FormControl><Textarea placeholder="e.g., easy to use, powerful, AI-driven" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
    </div>
);

const Step4 = ({ budgetTier, budgetProgress }: { budgetTier: string; budgetProgress: number }) => {
    const { watch } = useFormContext();
    const paymentMethod = watch('paymentMethod');

    return (
        <div className="space-y-6">
            <FormField control={useFormContext().control} name="estimatedBudget" render={({ field }) => (
            <FormItem>
                <FormLabel className="flex items-center">
                Estimated Budget (USD)
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-5 h-5 ml-1">
                            <Info className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Budget Level Guide</DialogTitle>
                        </DialogHeader>
                        <div className="prose prose-sm dark:prose-invert">
                                <p>This guide helps you understand the collaboration tiers. All budgets are welcome, but a higher budget generally allows for more comprehensive and impactful campaigns.</p>
                                <dl>
                                    <dt className='font-bold'>$300–$500: ⚠️ Starter Collaboration (Basic Budget)</dt>
                                    <dt className='font-bold mt-2'>$500–$800: 👍 Standard Collaboration (Good Level)</dt>
                                    <dt className='font-bold mt-2'>$800–$1000: 💼 Premium Collaboration (Great Value)</dt>
                                    <dt className='font-bold mt-2'>$1000+: 💎 Elite Collaboration (High Performance Partnership)</dt>
                                </dl>
                        </div>
                    </DialogContent>
                </Dialog>
                </FormLabel>
                <FormControl>
                <Input 
                    type="number" 
                    placeholder="e.g., 500" 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                />
                </FormControl>
                <FormMessage />
                <div className="mt-2">
                <Progress value={budgetProgress} className="w-full" />
                <p className="text-sm font-medium text-center mt-2">{budgetTier}</p>
                </div>
            </FormItem>
            )} />
            <FormField control={useFormContext().control} name="country" render={({ field }) => (
            <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {countries.map(country => (
                    <SelectItem key={country.code} value={country.name}>
                        {country.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
            )} />
            <FormField control={useFormContext().control} name="paymentMethod" render={({ field }) => (
                <FormItem>
                    <FormLabel>Preferred Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="upi">UPI (for India, no taxes)</SelectItem>
                            <SelectItem value="wise">Wise (International)</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="debit-card">Debit Card (via PayPal)</SelectItem>
                            <SelectItem value="credit-card">Credit Card (via PayPal)</SelectItem>
                            <SelectItem value="bank-account">Bank Account (via PayPal)</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    {paymentMethod && paymentMethod !== 'upi' && (
                         <div className="mt-2 flex items-center text-sm text-destructive">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            <span>Taxes and processing fees will be borne by the brand.</span>
                        </div>
                    )}
                </FormItem>
            )} />
        </div>
    );
};

const Step5 = () => {
    const { getValues } = useFormContext<BrandFormValues>();
    const values = getValues();
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const inquiryId = `YBT-${Date.now()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <ScrollArea className="h-[60vh] sm:h-auto">
            <div className="space-y-6 pr-6">
                <div className="border rounded-xl shadow-sm">
                    <div className="p-6">
                        <header className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold font-headline text-primary flex items-center gap-2">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                    You B Tech
                                </h2>
                                <p className="text-muted-foreground">Collaboration Inquiry</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-lg">{inquiryId}</p>
                                <p className="text-sm text-muted-foreground">Date: {submissionDate}</p>
                            </div>
                        </header>

                        <div className="grid sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-2">BILL TO</h3>
                                <div className="text-sm">
                                    <p className="font-bold">{values.brandName}</p>
                                    <p>{values.contactPerson}</p>
                                    <p>{values.workEmail}</p>
                                    <p>{values.country}</p>
                                </div>
                            </div>
                            {values.productLink && (
                                <div>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">BRAND/PRODUCT</h3>
                                    <a href={values.productLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">{values.productLink}</a>
                                </div>
                            )}
                        </div>
                    
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Service Description</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Video Type</TableCell>
                                    <TableCell className="text-right capitalize">{values.videoType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Product Type</TableCell>
                                    <TableCell className="text-right capitalize">{values.productType}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Target Platforms</TableCell>
                                    <TableCell className="text-right capitalize">{values.platforms.join(', ')}</TableCell>
                                </TableRow>
                                {values.description && (
                                    <TableRow>
                                        <TableCell>Campaign Description</TableCell>
                                        <TableCell className="text-right text-xs max-w-[200px] truncate">{values.description}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Separator className="my-6" />

                        <div className="flex justify-end">
                            <div className="w-full max-w-xs space-y-2">
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Estimated Budget</span>
                                    <span>${values.estimatedBudget.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Payment Method</span>
                                    <span className="capitalize">{values.paymentMethod.replace('-', ' ')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted/50 p-4 text-xs text-center text-muted-foreground rounded-b-xl">
                        This is a preliminary inquiry. A formal proposal and invoice will be sent upon approval.
                    </div>
                </div>


                <FormField
                    control={useFormContext().control}
                    name="termsAgreed"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                            <FormLabel>
                            I agree to the 
                            <Button variant="link" className="p-0 h-auto ml-1" type="button" onClick={() => setIsTermsOpen(true)}>Terms of Service</Button>
                            and 
                            <Button variant="link" className="p-0 h-auto ml-1" type="button" onClick={() => setIsPrivacyOpen(true)}>Privacy Policy</Button>
                            .
                            </FormLabel>
                            <FormMessage />
                        </div>
                        </FormItem>
                    )}
                />
                <LegalModal isOpen={isTermsOpen} setIsOpen={setIsTermsOpen} title="Terms of Service" content={<BrandTerms />} />
                <LegalModal isOpen={isPrivacyOpen} setIsOpen={setIsPrivacyOpen} title="Privacy Policy" content={<BrandPrivacy />} />
            </div>
        </ScrollArea>
    );
};
