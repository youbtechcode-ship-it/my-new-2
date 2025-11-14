'use client';

import FadeInSection from "./FadeInSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
    return (
        <FadeInSection>
            <section id="cta" className="py-20 px-4 bg-card border-t border-border">
                <div className="container mx-auto text-center">
                    <h2 className="font-headline text-4xl font-bold mb-4">Ready to Collaborate?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Let's create something amazing together. Click the button below to start your inquiry.
                    </p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
                        <Link href="/collaborate">
                           Start Collaboration Now <ArrowRight className="inline-block ml-2" />
                        </Link>
                    </Button>
                    <p className="mt-6 text-sm text-muted-foreground">
                        💡 Quick Tip: Telegram promotion is always free with YouTube collaborations.
                    </p>
                </div>
            </section>
        </FadeInSection>
    );
};

export default CTASection;
