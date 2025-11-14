'use client';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import FadeInSection from './FadeInSection';
import { Briefcase, Zap } from 'lucide-react';

const AboutSection = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const content = (
    <div className="lg:w-1/2 lg:pl-12">
      <h2 className="font-headline text-4xl font-bold mb-6">About You B Tech</h2>
      <p className="text-lg text-muted-foreground mb-4">
        You B Tech is a fast-growing tech channel dedicated to demystifying the world of AI tools, app development, and digital productivity. We create high-quality, in-depth video tutorials and reviews that empower our audience to build, innovate, and create.
      </p>
      <p className="text-lg text-muted-foreground mb-8">
        Our core mission is <strong className="text-accent">&quot;innovation through clarity.&quot;</strong> We believe the best way to foster creativity is by making complex topics accessible and actionable for everyone, from beginners to seasoned professionals.
      </p>
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Briefcase className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Brand</h3>
            <p className="text-muted-foreground">You B Tech</p>
          </div>
        </div>
        <div className="flex items-start gap-4 mt-4">
          <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Focus Areas</h3>
            <p className="text-muted-foreground">AI Tools, App Development, Digital Creativity</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <FadeInSection>
      <section id="about" className="py-20 px-4 container mx-auto">
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className={isDesktop ? 'lg:sticky top-28' : ''}>
              <Image
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoXU2S_A4w-vdhJPMi22QCi0P_iL9Gg2uM5KzCgWq-I3hss_8pBprN9mKBYUuMZo9H3d3QWkPZFgB7Ld-dKfw7xTf_m-m9yG8Hh9ZlcqXu_tL1uG0Yx94g2m0sP0Z3n0c5W1s9J2n1/s1600/brajendra-choudhary.jpg"
                alt="Brajendra Choudhary, creator of You B Tech"
                width={500}
                height={500}
                className="rounded-3xl shadow-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          {content}
        </div>
      </section>
    </FadeInSection>
  );
};

export default AboutSection;
