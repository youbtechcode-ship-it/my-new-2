'use client';

import { Youtube, Instagram, Send } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import DemographicChart from './DemographicChart';
import FadeInSection from './FadeInSection';
import { motion } from 'framer-motion';

const SocialStatCard = ({ icon, label, value, suffix, color, link }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="bg-card p-6 rounded-2xl border border-border text-center flex-1 min-w-[200px] transition-transform duration-300 hover:-translate-y-2">
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center">
        <div className={`mb-4 text-${color}`}>{icon}</div>
        <div className="text-4xl font-bold font-headline mb-1">
          {isInView && <CountUp start={0} end={value} duration={2.5} separator="," />}
          {suffix}
        </div>
        <p className="text-muted-foreground">{label}</p>
      </a>
    </div>
  );
};


const AudienceSection = () => {
    return (
        <FadeInSection>
            <section id="audience" className="relative py-20 px-4 container mx-auto overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"
                    animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
                />
                <div className="relative z-10">
                    <h2 className="text-center font-headline text-4xl font-bold mb-12">Audience & Reach</h2>
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <SocialStatCard icon={<Youtube size={48} />} label="Subscribers" value={60} suffix="K+" color="red-500" link="https://youtube.com/@you_b_tech" />
                        <SocialStatCard icon={<Instagram size={48} />} label="Followers" value={2.5} suffix="K+" color="pink-500" link="https://instagram.com/youbtech" />
                        <SocialStatCard icon={<Send size={48} />} label="Members" value={8.9} suffix="K+" color="blue-400" link="https://t.me/youbtech" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <DemographicChart
                            title="Audience by Country"
                            data={[
                                { name: 'India', value: 60, color: 'hsl(var(--chart-1))' },
                                { name: 'United States', value: 19, color: 'hsl(var(--chart-2))' },
                                { name: 'Brazil', value: 5, color: 'hsl(var(--chart-3))' },
                                { name: 'United Kingdom', value: 4, color: 'hsl(var(--chart-4))' },
                                { name: 'Other', value: 12, color: 'hsl(var(--chart-5))' },
                            ]}
                        />
                        <DemographicChart
                            title="Audience by Age"
                            data={[
                                { name: '18-24', value: 42.2, color: 'hsl(var(--chart-1))' },
                                { name: '25-34', value: 33.0, color: 'hsl(var(--chart-2))' },
                                { name: '35-44', value: 15.8, color: 'hsl(var(--chart-3))' },
                                { name: '45+', value: 9.0, color: 'hsl(var(--chart-4))' },
                            ]}
                        />
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 max-w-3xl mx-auto text-center">
                        <h3 className="font-bold text-xl mb-2">Primary Interests</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">Artificial Intelligence</span>
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">App Development</span>
                            <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">Digital Creativity</span>
                        </div>
                    </div>
                </div>
            </section>
        </FadeInSection>
    );
};

export default AudienceSection;
