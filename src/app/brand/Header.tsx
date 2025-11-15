'use client';

import Link from 'next/link';
import { Menu, Home, MessageSquare, Briefcase, Building2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import ThemeSelector from './ThemeSelector';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home className="w-6 h-6" /> },
  { href: '/subscriber', label: 'Connect', icon: <MessageSquare className="w-6 h-6" /> },
  { href: '/freelancer', label: 'Work', icon: <Briefcase className="w-6 h-6" /> },
  { href: '/brand', label: 'Brands', icon: <Building2 className="w-6 h-6" /> },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-card/50 backdrop-blur-lg border border-border rounded-full shadow-lg p-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-4 pr-2">
            <span className="font-bold font-headline text-md">YBT</span>
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
             <ThemeSelector />
            {/* Mobile Navigation */}
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <Menu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="grid grid-cols-4 gap-4 pt-4">
                     {navLinks.map((link) => (
                       <Link 
                        key={link.href} 
                        href={link.href} 
                        className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                       >
                        {link.icon}
                        <span className="text-xs font-medium">{link.label}</span>
                      </Link>
                    ))}
                  </nav>
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
