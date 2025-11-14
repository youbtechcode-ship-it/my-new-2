'use client';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    const scrollToCTA = () => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <FadeInSection>
            <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid-background mask-image-gradient"></div>
                 <motion.div
                    className="absolute inset-0 bg-dot-grid"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 200, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
                 ></motion.div>

                <div className="relative z-10">
                    <h1 className="font-headline text-6xl md:text-8xl font-black">
                        Let’s Collaborate{' '}
                        <motion.span 
                            className="inline-block"
                            whileHover={{ rotate: [0, 15, -10, 15, -10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            🤝
                        </motion.span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
                        Work with You B Tech to reach a high-intent tech audience through authentic and creative storytelling.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
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
                    </div>
                </div>
            </section>
        </FadeInSection>
    );
};

export default HeroSection;
