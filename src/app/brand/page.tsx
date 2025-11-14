'use client';

import React from 'react';
import CardNav from './CardNav';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import AudienceSection from './AudienceSection';
import CollaborationsSection from './CollaborationsSection';
import WhyUsSection from './WhyUsSection';
import ProcessSection from './ProcessSection';
import CTASection from './CTASection';
import Footer from './Footer';

export default function BrandPage() {
  return (
      <div className="bg-background text-foreground font-body">
        <CardNav />
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
  );
}
