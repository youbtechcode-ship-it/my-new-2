'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Send, Github, Mail } from 'lucide-react';
import LegalModal from './LegalModal';
import SocialBrowserModal from './SocialBrowserModal';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [legalContent, setLegalContent] = useState({ title: '', content: '' });
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

    const [socialUrl, setSocialUrl] = useState('');
    const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

    const handleLegalClick = (type: 'terms' | 'privacy') => {
        if (type === 'terms') {
            setLegalContent({
                title: 'Terms of Service',
                content: 'This is a placeholder for your Terms of Service. Please replace this with your actual terms.'
            });
        } else {
            setLegalContent({
                title: 'Privacy Policy',
                content: 'This is a placeholder for your Privacy Policy. Please replace this with your actual policy.'
            });
        }
        setIsLegalModalOpen(true);
    };
    
    const handleSocialClick = (url: string) => {
        setSocialUrl(url);
        setIsSocialModalOpen(true);
    };

    return (
        <footer className="bg-card border-t border-border text-foreground py-12 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h3 className="font-headline text-2xl font-bold mb-4">You B Tech</h3>
                    <p className="text-muted-foreground text-sm">Innovation through clarity. Creating content that empowers tech enthusiasts and developers.</p>
                     <div className="flex items-center gap-3 mt-4 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <a href="mailto:youbtechcode@gmail.com" className="text-sm hover:text-accent transition-colors">
                            youbtechcode@gmail.com
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/brand#about" className="text-muted-foreground hover:text-accent transition-colors">About Us</Link></li>
                        <li><Link href="/brand#portfolio" className="text-muted-foreground hover:text-accent transition-colors">Portfolio</Link></li>
                        <li><Link href="/brand#process" className="text-muted-foreground hover:text-accent transition-colors">Our Process</Link></li>
                        <li><Link href="/collaborate" className="text-muted-foreground hover:text-accent transition-colors">Start Collaboration</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><button onClick={() => handleLegalClick('terms')} className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</button></li>
                        <li><button onClick={() => handleLegalClick('privacy')} className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                       <button onClick={() => handleSocialClick('https://youtube.com/@you_b_tech')} className="text-muted-foreground hover:text-accent transition-colors"><Youtube /></button>
                       <button onClick={() => handleSocialClick('https://instagram.com/youbtech')} className="text-muted-foreground hover:text-accent transition-colors"><Instagram /></button>
                       <button onClick={() => handleSocialClick('https://t.me/youbtech')} className="text-muted-foreground hover:text-accent transition-colors"><Send /></button>
                       <span className="text-muted-foreground/50 cursor-not-allowed"><Github /></span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto text-center mt-12 border-t border-border pt-8">
                <p className="text-sm text-muted-foreground">&copy; {currentYear} You B Tech – All Rights Reserved</p>
            </div>
            
            <LegalModal isOpen={isLegalModalOpen} setIsOpen={setIsLegalModalOpen} title={legalContent.title} content={legalContent.content} />
            <SocialBrowserModal isOpen={isSocialModalOpen} setIsOpen={setIsSocialModalOpen} url={socialUrl} />
        </footer>
    );
};

export default Footer;
