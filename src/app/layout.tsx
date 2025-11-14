import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { themes } from '@/lib/themes';

export const metadata: Metadata = {
  title: 'YBT Connect Pro',
  description: 'A personal brand engagement platform for subscribers, freelancers, and brands.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen bg-background flex flex-col')}>
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="youbtech"
            themes={themes.map(t => t.name)}
            disableTransitionOnChange
            forcedTheme="light"
          >
            <main className="flex-grow">{children}</main>
            <Toaster />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
