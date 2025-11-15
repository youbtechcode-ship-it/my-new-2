import Link from 'next/link';
import { ArrowRight, Briefcase, Building2, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from './brand/Header';
import Footer from './brand/Footer';

const userTypes = [
  {
    icon: <MessageSquare className="w-10 h-10 text-accent" />,
    title: 'Subscriber',
    tagline: 'Send feedback, queries, or just say hello.',
    href: '/subscriber',
    cta: 'Enter',
  },
  {
    icon: <Briefcase className="w-10 h-10 text-accent" />,
    title: 'Freelancer',
    tagline: 'Find projects and collaborate on creative work.',
    href: '/freelancer',
    cta: 'Enter',
  },
  {
    icon: <Building2 className="w-10 h-10 text-accent" />,
    title: 'Brand',
    tagline: 'Propose collaborations and sponsorships.',
    href: '/brand',
    cta: 'Enter',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-background">
          <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground">
                Welcome to YBT Connect
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                The central hub for connection and collaboration. Choose your path below to get started.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
                {userTypes.map((user) => (
                  <Card key={user.title} className="flex flex-col text-center items-center transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl hover:-translate-y-2 border-2 border-border hover:border-accent bg-card/50 backdrop-blur-sm">
                    <CardHeader className="items-center">
                      <div className="p-4 bg-accent/10 rounded-full">
                        {user.icon}
                      </div>
                      <CardTitle className="mt-4 font-headline text-2xl">{user.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{user.tagline}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full" variant="ghost">
                        <Link href={user.href}>
                          {user.cta}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
          </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
