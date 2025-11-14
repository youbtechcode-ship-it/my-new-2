'use client';

import FadeInSection from "./FadeInSection";
import { FormInput, FileText, CheckCircle, Video, Rocket } from "lucide-react";

const steps = [
    { num: 1, title: 'Submit Form', icon: <FormInput className="w-8 h-8" />, description: 'Fill out our detailed collaboration form with your requirements.' },
    { num: 2, title: 'Receive Proposal', icon: <FileText className="w-8 h-8" />, description: 'We send a custom proposal and quote within 48 hours.' },
    { num: 3, title: 'Confirm Deal', icon: <CheckCircle className="w-8 h-8" />, description: 'Approve the proposal and finalize the agreement to get started.' },
    { num: 4, title: 'Video Production', icon: <Video className="w-8 h-8" />, description: 'We script, shoot, and edit the content, keeping you updated.' },
    { num: 5, title: 'Review & Go Live', icon: <Rocket className="w-8 h-8" />, description: 'You review the final video, and we publish on the agreed date.' },
];

const ProcessSection = () => {
    return (
        <FadeInSection>
            <section id="process" className="py-20 px-4 container mx-auto">
                <h2 className="text-center font-headline text-4xl font-bold mb-16">Our Collaboration Process</h2>

                {/* Mobile View */}
                <div className="md:hidden">
                    <div className="relative border-l-2 border-dashed border-accent ml-6">
                        {steps.map((step, index) => (
                            <div key={step.num} className="mb-10 ml-10">
                                <div className="absolute -left-[26px] bg-accent text-accent-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                                    {step.num}
                                </div>
                                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                    <div className="text-accent mb-2">{step.icon}</div>
                                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-accent -translate-y-1/2" style={{clipPath: "polygon(0 0, 20% 0, 20% 100%, 0% 100%)"}}></div> {/* This can be animated with scroll */}
                    </div>
                    <div className="relative flex justify-between">
                        {steps.map(step => (
                            <div key={step.num} className="w-1/5 text-center px-2">
                                <div className="relative mb-4">
                                     <div className="w-16 h-16 bg-card border-4 border-accent text-accent rounded-full mx-auto flex items-center justify-center">
                                       {step.icon}
                                     </div>
                                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+2rem)] bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                         {step.num}
                                     </div>
                                </div>
                                <h3 className="font-bold mb-1">{step.title}</h3>
                                <p className="text-xs text-muted-foreground">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </FadeInSection>
    );
};

export default ProcessSection;
