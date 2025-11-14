'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, ArrowRight, User, Briefcase, Building2 } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

const Card = ({ title, icon, className, children }) => {
    return (
        <div className={`card relative p-6 rounded-2xl overflow-hidden ${className}`}>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">{icon}{title}</h3>
            {children}
        </div>
    );
};

const CardLink = ({ text, href, external = false, onClick }) => {
    const content = (
        <p className="flex justify-between items-center text-sm font-medium hover:text-accent transition-colors">
            {text}
            <ArrowRight size={16} />
        </p>
    );

    if (external) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="block mt-2" onClick={onClick}>{content}</a>;
    }
    
    return <Link href={href} onClick={onClick} className="block mt-2">{content}</Link>;
};


const Header = () => {
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
    
    const handleLinkClick = (e, href) => {
        if (href && href.startsWith('/brand#')) {
            e.preventDefault();
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
      setIsOpen(false);
    }

    return (
        <header ref={container} className="fixed top-0 left-0 w-full z-50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="font-bold font-headline text-lg">YBT</Link>
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
                        <Card title="Subscriber" icon={<User size={20} />} className="bg-[var(--card-about-bg)] text-white">
                            <CardLink text="Send a Message" href="/subscriber" onClick={(e) => handleLinkClick(e, '/subscriber')} />
                            <CardLink text="Why Connect?" href="/subscriber#why-connect" onClick={(e) => handleLinkClick(e, '/subscriber#why-connect')} />
                        </Card>
                        <Card title="Freelancer" icon={<Briefcase size={20} />} className="bg-[var(--card-work-bg)] text-white">
                            <CardLink text="Apply Now" href="/freelancer" onClick={(e) => handleLinkClick(e, '/freelancer')} />
                            <CardLink text="See Benefits" href="/freelancer#benefits" onClick={(e) => handleLinkClick(e, '/freelancer#benefits')} />
                        </Card>
                         <Card title="Brand" icon={<Building2 size={20} />} className="bg-accent text-accent-foreground">
                            <CardLink text="Collaborate" href="/brand" onClick={(e) => handleLinkClick(e, '/brand')} />
                            <CardLink text="Our Process" href="/brand#process" onClick={(e) => handleLinkClick(e, '/brand#process')} />
                            <CardLink text="Start Inquiry" href="/collaborate" onClick={(e) => handleLinkClick(e, '/collaborate')} />
                        </Card>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
