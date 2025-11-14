'use client';

import { useState } from 'react';
import BrandForm from '@/app/brand/BrandForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CollaboratePage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen(false)}>
            <DialogContent className="max-w-4xl w-full" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="font-headline text-3xl text-center">Collaboration Inquiry</DialogTitle>
                </DialogHeader>
                <BrandForm setOpen={setIsOpen} />
            </DialogContent>
        </Dialog>
    </div>
  );
}
