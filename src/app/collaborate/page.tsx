'use client';

import { useState } from 'react';
import BrandForm from '@/app/brand/BrandForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Header from '@/app/brand/Header';
import Footer from '@/app/brand/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CollaboratePage() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  // This function is passed to the BrandForm to control the visibility of the container.
  // It's not a Dialog anymore, but we can reuse the logic.
  const handleFormStateChange = (open: boolean) => {
    setIsFormOpen(open);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 md:py-32 flex items-center justify-center">
        {isFormOpen && (
           <Card className="max-w-4xl w-full shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-center">Collaboration Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <BrandForm setOpen={handleFormStateChange} />
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
}
