'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LiquidChrome from './LiquidChrome';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
    const scrollToCTA = () => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
            <LiquidChrome />
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Button variant="outline" size="sm" className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                        <Sparkles className="w-4 h-4 mr-2" />
                        New Background
                    </Button>
                </motion.div>

                <motion.h1
                    className="font-headline text-5xl md:text-7xl font-black mt-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Swirl around in the deep sea <br /> of liquid chrome!
                </motion.h1>
                
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button
                        onClick={scrollToCTA}
                        size="lg"
                        className="bg-white text-black font-bold px-8 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="font-bold px-8 py-4 rounded-full shadow-md bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    >
                       Learn More
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
