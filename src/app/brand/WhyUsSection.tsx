'use client';

import { FiTarget, FiTrendingUp, FiMessageCircle, FiEdit, FiSearch, FiShield, FiHeart, FiGift, FiZap } from 'react-icons/fi';
import GlareHover from './GlareHover';
import FadeInSection from './FadeInSection';

const features = [
  { icon: <FiTarget size={24} />, title: "Targeted Tech Audience", description: "Reach viewers genuinely interested in AI, development, and digital tools." },
  { icon: <FiTrendingUp size={24} />, title: "High Conversion Videos", description: "Our content is crafted for high retention and actionable conversions." },
  { icon: <FiMessageCircle size={24} />, title: "Transparent Communication", description: "Direct access and clear communication throughout the process." },
  { icon: <FiEdit size={24} />, title: "Creative Storytelling", description: "We blend your brand's message into an engaging and authentic narrative." },
  { icon: <FiSearch size={24} />, title: "SEO-Optimized Content", description: "Videos are optimized to rank on YouTube and Google for long-term visibility." },
  { icon: <FiShield size={24} />, title: "Brand Safe Environment", description: "Your brand will be featured in a professional and respected context." },
  { icon: <FiHeart size={24} />, title: "Audience Trust", description: "Leverage the trust we've built with our audience for authentic promotions." },
  { icon: <FiGift size={24} />, title: "Bonus Exposure", description: "Free cross-promotion on platforms like Telegram with every YouTube collaboration." },
  { icon: <FiZap size={24} />, title: "Fast Turnaround", description: "Efficient process from proposal to publishing, without compromising quality." },
];

const WhyUsSection = () => {
  return (
    <FadeInSection>
      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-center font-headline text-4xl font-bold mb-12">Why Collaborate With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlareHover key={index}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full text-center">
                <div className="inline-block text-accent bg-accent/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </GlareHover>
          ))}
        </div>
      </section>
    </FadeInSection>
  );
};

export default WhyUsSection;
