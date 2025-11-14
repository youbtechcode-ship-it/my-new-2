'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-card/50 backdrop-blur-lg border border-border rounded-full shadow-lg p-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 pl-4 pr-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-bold font-headline text-md hidden sm:inline">YBT</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
            <Link href="/subscriber" className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full hidden sm:inline">
              Connect
            </Link>
            <Link href="/freelancer" className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full hidden sm:inline">
              Work
            </Link>
            <Link href="/brand" className="px-3 py-1.5 hover:text-foreground transition-colors rounded-full hidden sm:inline">
              Brands
            </Link>
          </nav>
          <div className="pr-1">
             <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
