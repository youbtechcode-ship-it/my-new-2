'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DotGrid from './DotGrid';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
    const scrollToCTA = () => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
            <DotGrid
                dotSize={2}
                gap={25}
                baseColor="hsl(var(--accent-hsl))"
                activeColor="hsl(var(--primary-hsl))"
                proximity={120}
                speedTrigger={200}
                shockRadius={200}
                shockStrength={2}
                maxSpeed={3000}
                resistance={500}
                returnDuration={1}
            />
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Button variant="outline" size="sm" className="rounded-full bg-background/10 backdrop-blur-sm border-foreground/20 hover:bg-background/20">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
                        Interactive Background
                    </Button>
                </motion.div>

                <motion.h1
                    className="font-headline text-5xl md:text-7xl font-black mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Connect with Your Audience
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Powerful brand collaborations that make an impact. Let's build something great together.
                </motion.p>
                
                <motion.div
                    className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Button
                        onClick={scrollToCTA}
                        size="lg"
                        className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="font-bold px-8 py-4 rounded-full shadow-md bg-background/10 backdrop-blur-sm border-foreground/20 hover:bg-background/20"
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                       Learn More
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
