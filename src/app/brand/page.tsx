'use client';

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import AudienceSection from './AudienceSection';
import CollaborationsSection from './CollaborationsSection';
import WhyUsSection from './WhyUsSection';
import ProcessSection from './ProcessSection';
import CTASection from './CTASection';
import Footer from './Footer';
import Waves from './Waves';

export default function BrandPage() {
  return (
      <div className="bg-background text-foreground font-body">
        <Waves 
          className="fixed inset-0 z-0" 
          lineColor="hsla(var(--primary-hsl), 0.2)"
        />
        <div className="relative z-10">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <AudienceSection />
            <CollaborationsSection />
            <WhyUsSection />
            <ProcessSection />
            <CTASection />
          </main>
          <Footer />
        </div>
      </div>
  );
}

    