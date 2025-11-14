'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import BrandForm from './BrandForm';
import { Award, BarChart3, Bot, Clapperboard, Smartphone, Users } from 'lucide-react';

const creatorProfile = {
  name: 'Brajendra',
  niche: 'Tech / AI / Digital Tools',
  specialty: 'High-retention long-form content',
};

const audienceInsights = [
  { icon: <Users className="w-8 h-8 text-accent" />, label: 'Country', value: 'Global Distribution' },
  { icon: <BarChart3 className="w-8 h-8 text-accent" />, label: 'Age Groups', value: '18-35' },
  { icon: <Award className="w-8 h-8 text-accent" />, label: 'Monthly Reach', value: '5M+' },
  { icon: <Smartphone className="w-8 h-8 text-accent" />, label: 'Device Type', value: 'Mobile & Desktop' },
];

const pastCollaborations = [
  PlaceHolderImages.find(p => p.id === 'brand-logo-1'),
  PlaceHolderImages.find(p => p.id === 'brand-logo-2'),
  PlaceHolderImages.find(p => p.id === 'brand-logo-3'),
  PlaceHolderImages.find(p => p.id === 'brand-logo-4'),
].filter(Boolean);

const trustCards = [
    { value: '2-3M+', label: 'Monthly Views' },
    { value: 'Fast', label: 'Delivery' },
    { value: 'High', label: 'Conversion Rates' },
    { value: 'Zero', label: 'Fake Audience' },
]

const processSteps = [
    { step: 1, title: 'Submit Requirement', description: 'Fill out the collaboration form with your campaign details.' },
    { step: 2, title: 'Receive Proposal', description: 'Get a custom proposal and pricing based on your needs.' },
    { step: 3, title: 'Approval', description: 'Review and approve the proposal to kick things off.' },
    { step: 4, title: 'Delivery & Publish', description: 'Content is created, delivered, and published on schedule.' },
    { step: 5, title: 'Report', description: 'Receive a performance report after the campaign.' },
];

export default function BrandPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <section className="text-center">
                <h1 className="text-4xl md:text-6xl font-headline font-bold">Collaborate With YBT</h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Work with a high-performing digital creator to reach your audience.
                </p>
            </section>
            
            <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Creator Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4"><Users className="w-5 h-5 text-accent" /><p><strong>Name:</strong> {creatorProfile.name}</p></div>
                        <div className="flex items-center gap-4"><Bot className="w-5 h-5 text-accent" /><p><strong>Niche:</strong> {creatorProfile.niche}</p></div>
                        <div className="flex items-center gap-4"><Clapperboard className="w-5 h-5 text-accent" /><p><strong>Specialty:</strong> {creatorProfile.specialty}</p></div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Audience Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {audienceInsights.map(insight => (
                            <div key={insight.label} className="text-center">
                                <div className="mx-auto bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center">{insight.icon}</div>
                                <p className="mt-2 font-semibold text-lg">{insight.value}</p>
                                <p className="text-sm text-muted-foreground">{insight.label}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>

            <section className="mt-16 bg-card p-8 rounded-lg border">
                <h2 className="text-3xl font-headline font-semibold text-center mb-8">Trusted By Great Brands</h2>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    {pastCollaborations.map((logo, index) => logo && (
                        <Image key={index} src={logo.imageUrl} alt={logo.description} width={150} height={50} className="opacity-70 hover:opacity-100 transition-opacity" data-ai-hint={logo.imageHint} />
                    ))}
                </div>
            </section>
            
            <section className="mt-16">
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustCards.map(card => (
                        <Card key={card.label} className="text-center p-6">
                            <p className="text-4xl font-bold text-accent font-headline">{card.value}</p>
                            <p className="mt-2 text-muted-foreground font-semibold">{card.label}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mt-16">
                <h2 className="text-3xl font-headline font-semibold text-center mb-10">Collaboration Process</h2>
                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
                    {processSteps.map((step, index) => (
                        <div key={step.step} className="md:flex items-center w-full mb-8 md:mb-0">
                            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:flex-row-reverse'}`}>
                                <Card className="p-6">
                                    <h3 className="font-bold font-headline text-xl text-accent">Step {step.step}: {step.title}</h3>
                                    <p className="text-muted-foreground mt-2">{step.description}</p>
                                </Card>
                            </div>
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary items-center justify-center text-primary-foreground font-bold">{step.step}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-16 text-center">
                 <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="text-lg px-10 py-6 rounded-full font-bold">Start Collaboration</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Brand Collaboration Form</DialogTitle>
                        </DialogHeader>
                        <BrandForm setOpen={setIsFormOpen} />
                    </DialogContent>
                </Dialog>
            </section>
        </div>
    );
}
