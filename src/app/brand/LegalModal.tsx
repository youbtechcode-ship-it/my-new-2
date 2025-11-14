'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LegalModal = ({ isOpen, setIsOpen, title, content }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto pr-4">
          <p>{content}</p>
          {/* In a real app, you'd render the full legal text here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal;
