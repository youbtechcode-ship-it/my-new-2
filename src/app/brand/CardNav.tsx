'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, ArrowRight, Book, Youtube, Handshake, Users, Milestone } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

const Card = ({ title, icon, link, href, external = false, className, children }) => {
    const handleLinkClick = (e) => {
        if (!external && href.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.substring(2);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    const content = (
        <div className={`card relative p-6 rounded-2xl overflow-hidden ${className}`}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">{icon}{title}</h3>
            {children}
        </div>
    );

    if (external) {
        return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
    }

    return <Link href={href} onClick={handleLinkClick} passHref legacyBehavior><a>{content}</a></Link>;
};

const CardLink = ({ text, href, external = false }) => {
    const handleLinkClick = (e) => {
        if (!external && href.startsWith('/#')) {
            e.preventDefault();
            const targetId = href.substring(2);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };
    
    const content = (
        <p className="flex justify-between items-center text-sm font-medium hover:text-accent transition-colors">
            {text}
            <ArrowRight size={16} />
        </p>
    );

    if (external) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="block mt-2">{content}</a>;
    }
    
    return <Link href={href} onClick={handleLinkClick} passHref legacyBehavior><a className="block mt-2">{content}</a></Link>;
};


const CardNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const container = useRef(null);
    const tl = useRef<gsap.core.Timeline>();

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
            .to(".card-nav-overlay", { opacity: 1, duration: 0.3, ease: "power2.inOut" })
            .fromTo(".card", {
                y: -30,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.2");
    }, { scope: container });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            tl.current?.play();
        } else {
            document.body.style.overflow = 'auto';
            tl.current?.reverse();
        }
    }, [isOpen]);
    
    const handleLinkClick = () => {
      setIsOpen(false);
    }

    return (
        <header ref={container} className="fixed top-0 left-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-bold font-headline text-lg">YBT</div>
                <div className="flex items-center gap-4">
                    <ThemeSelector />
                    <button onClick={() => setIsOpen(!isOpen)} className="bg-card p-2 rounded-full shadow-md border border-border">
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Overlay Menu */}
            <div 
                className="card-nav-overlay fixed inset-0 bg-background/80 backdrop-blur-sm opacity-0 pointer-events-none"
                style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            >
                <div className="container mx-auto pt-24 px-4">
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 bg-card p-2 rounded-full shadow-md border border-border">
                        <X size={24} />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div onClick={handleLinkClick}>
                            <Card title="About Us" icon={<Book size={20} />} href="/#about" className="bg-[var(--card-about-bg)] text-white">
                                <CardLink text="Who is Brajendra?" href="/#about" />
                                <CardLink text="Audience & Reach" href="/#audience" />
                            </Card>
                        </div>
                        <div onClick={handleLinkClick}>
                            <Card title="Our Work" icon={<Youtube size={20} />} href="/#portfolio" className="bg-[var(--card-work-bg)] text-white">
                                <CardLink text="Past Collaborations" href="/#portfolio" />
                                <CardLink text="YouTube Channel" href="https://youtube.com/@you_b_tech" external />
                            </Card>
                        </div>
                        <div onClick={handleLinkClick}>
                            <Card title="Collaborate" icon={<Handshake size={20} />} href="/brand" className="bg-accent text-accent-foreground">
                                <CardLink text="Start Your Inquiry" href="/brand" />
                                <CardLink text="Our Process" href="/#process" />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default CardNav;
