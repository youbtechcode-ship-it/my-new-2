'use client';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { Button } from '@/components/ui/button';
import DotGrid from './DotGrid';

const HeroSection = () => {
    const scrollToCTA = () => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <FadeInSection>
            <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
                <DotGrid
                    className="absolute inset-0"
                    dotSize={2}
                    gap={25}
                    baseColor="hsl(var(--accent-hsl))"
                    activeColor="hsl(var(--primary-hsl))"
                 />
                <div className="relative z-10">
                    <motion.h1 
                        className="font-headline text-6xl md:text-8xl font-black"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Let’s Collaborate{' '}
                        <motion.span 
                            className="inline-block"
                            whileHover={{ rotate: [0, 15, -10, 15, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            🤝
                        </motion.span>
                    </motion.h1>
                    <motion.p 
                        className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Work with You B Tech to reach a high-intent tech audience through authentic and creative storytelling.
                    </motion.p>
                    <motion.div 
                        className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button
                            onClick={scrollToCTA}
                            size="lg"
                            className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            Start Collaboration <ArrowDown size={20} />
                        </Button>
                        <Button
                            disabled
                            variant="outline"
                            size="lg"
                            className="font-bold px-8 py-4 rounded-full shadow-md cursor-not-allowed opacity-50"
                        >
                           Download Media Kit <Download size={20} />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </FadeInSection>
    );
};

export default HeroSection;
