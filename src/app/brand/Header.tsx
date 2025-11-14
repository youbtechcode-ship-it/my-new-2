'use client';

import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/subscriber', label: 'Connect' },
  { href: '/freelancer', label: 'Work' },
  { href: '/brand', label: 'Brands' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-card/50 backdrop-blur-lg border border-border rounded-full shadow-lg p-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-4 pr-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-bold font-headline text-md hidden sm:inline">YBT</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
               <Link key={link.href} href={link.href} className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {/* Mobile Navigation */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col items-center justify-center h-full">
                  <nav className="flex flex-col items-center gap-4 text-lg font-medium text-muted-foreground">
                     <Link href="/" className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full">Home</Link>
                     {navLinks.map((link) => (
                       <Link key={link.href} href={link.href} className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
