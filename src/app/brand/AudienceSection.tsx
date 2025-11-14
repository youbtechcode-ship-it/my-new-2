'use client';

import { Youtube, Instagram, Send } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CountUp from 'react-countup';
import DemographicChart from './DemographicChart';
import FadeInSection from './FadeInSection';
import GlareHover from './GlareHover';

const SocialStatCard = ({ icon, label, value, suffix, className, description, link }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex-1 min-w-[250px]">
        <a href={link} target="_blank" rel="noopener noreferrer">
            <GlareHover>
                <div className={`p-8 rounded-2xl text-center h-full flex flex-col justify-center items-center text-white ${className}`}>
                    <div className="mb-4">{icon}</div>
                    <div className="text-5xl font-bold font-headline mb-2">
                        {isInView && <CountUp start={0} end={value} duration={2.5} separator="," decimals={value % 1 !== 0 ? 1 : 0} />}
                        {suffix}
                    </div>
                    <p className="text-xl font-semibold">{label}</p>
                    <p className="text-white/80 mt-1">{description}</p>
                </div>
            </GlareHover>
        </a>
    </div>
  );
};


const AudienceSection = () => {
    return (
        <FadeInSection>
            <section id="audience" className="relative py-20 px-4 container mx-auto overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-center font-headline text-4xl font-bold mb-12">Audience & Reach</h2>
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <SocialStatCard 
                            icon={<Youtube size={48} />} 
                            label="60K+" 
                            value={60}
                            suffix=""
                            description="YouTube Subscribers"
                            className="bg-red-600"
                            link="https://youtube.com/@you_b_tech" 
                        />
                        <SocialStatCard 
                            icon={<Instagram size={48} />} 
                            label="2.5K+" 
                            value={2.5}
                            suffix=""
                            description="Instagram Followers"
                            className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
                            link="https://instagram.com/youbtech" 
                        />
                        <SocialStatCard 
                            icon={<Send size={48} />} 
                            label="8.9K+" 
                            value={8.9}
                            suffix=""
                            description="Telegram Members"
                            className="bg-blue-500"
                            link="https://t.me/youbtech" 
                        />
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

                    <GlareHover>
                        <div className="bg-card border border-border rounded-xl p-6 max-w-3xl mx-auto text-center">
                            <h3 className="font-bold text-xl mb-2">Primary Interests</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">Artificial Intelligence</span>
                                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">App Development</span>
                                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">Digital Creativity</span>
                            </div>
                        </div>
                    </GlareHover>
                </div>
            </section>
        </FadeInSection>
    );
};

export default AudienceSection;
