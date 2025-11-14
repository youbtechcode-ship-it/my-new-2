'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ReactNode } from 'react';

const LegalModal = ({ isOpen, setIsOpen, title, content }: { isOpen: boolean, setIsOpen: (open: boolean) => void, title: string, content: ReactNode }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto pr-4">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal;
