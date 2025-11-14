'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FreelancerForm from './FreelancerForm';
import { Banknote, Briefcase, Component, FileText, ImageIcon, LayoutGrid, Paintbrush, PenTool, Sparkles, TrendingUp, UserCheck } from 'lucide-react';
import Header from '../brand/Header';
import Footer from '../brand/Footer';
import { useState } from 'react';
import LegalModal from '../brand/LegalModal';
import { FreelancerTerms, FreelancerPrivacy } from '@/lib/legal';


const benefits = [
    { icon: <Banknote className="w-8 h-8 text-accent" />, title: 'Instant Payments', description: 'Get paid quickly after your work is approved.' },
    { icon: <TrendingUp className="w-8 h-8 text-accent" />, title: 'High-Quality Projects', description: 'Work on engaging projects that matter.' },
    { icon: <Sparkles className="w-8 h-8 text-accent" />, title: 'Growth Opportunities', description: 'Enhance your portfolio and gain exposure.' },
    { icon: <UserCheck className="w-8 h-8 text-accent" />, title: 'Direct Creator Access', description: 'Collaborate directly with the creator.' },
];

const workCategories = [
    { icon: <PenTool className="w-6 h-6" />, name: 'Editing' },
    { icon: <ImageIcon className="w-6 h-6" />, name: 'Thumbnails' },
    { icon: <Paintbrush className="w-6 h-6" />, name: 'UI/UX Design' },
    { icon: <Component className="w-6 h-6" />, name: 'Flutter Widgets' },
    { icon: <FileText className="w-6 h-6" />, name: 'Script Writing' },
    { icon: <LayoutGrid className="w-6 h-6" />, name: 'Micro-tasks' },
];

export default function FreelancerPage() {
  const [legalContent, setLegalContent] = useState({ title: '', content: <></> });
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  const handleLegalClick = (type: 'terms' | 'privacy') => {
      if (type === 'terms') {
          setLegalContent({
              title: 'Freelancer – Terms of Service',
              content: <FreelancerTerms />
          });
      } else {
          setLegalContent({
              title: 'Freelancer – Privacy Policy',
              content: <FreelancerPrivacy />
          });
      }
      setIsLegalModalOpen(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-24 md:py-32">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold">Work With YBT</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Real projects. Fast payouts. Professional exposure.
        </p>
      </section>

      <section id="benefits" className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-8">Benefits of Working With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(b => (
                <Card key={b.title} className="text-center">
                    <CardHeader className="items-center">
                        <div className="p-3 bg-accent/10 rounded-full">{b.icon}</div>
                        <CardTitle className="mt-4 text-xl font-body">{b.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{b.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-headline font-semibold text-center mb-8">Work Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {workCategories.map(cat => (
                <Card key={cat.name} className="flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow">
                    <div className="p-3 bg-accent/10 rounded-full text-accent">{cat.icon}</div>
                    <p className="mt-3 font-semibold">{cat.name}</p>
                </Card>
            ))}
        </div>
      </section>

      <section className="mt-16">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Apply to be a Freelancer</CardTitle>
          </CardHeader>
          <CardContent>
            <FreelancerForm />
          </CardContent>
        </Card>
      </section>
    </main>
    <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground my-8">
            <button onClick={() => handleLegalClick('terms')} className="hover:text-accent transition-colors">Terms of Service</button>
            <span className="mx-2">|</span>
            <button onClick={() => handleLegalClick('privacy')} className="hover:text-accent transition-colors">Privacy Policy</button>
        </div>
    </div>
    <Footer />
    <LegalModal isOpen={isLegalModalOpen} setIsOpen={setIsLegalModalOpen} title={legalContent.title} content={legalContent.content} />
    </div>
  );
}
