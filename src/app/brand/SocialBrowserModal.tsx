'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, RefreshCw, ArrowLeft, ArrowRight, Lock, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

const SocialBrowserModal = ({ isOpen, setIsOpen, url }) => {
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    if (isOpen) {
      setCurrentUrl(url);
    }
  }, [isOpen, url]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl h-[90vh] p-0 flex flex-col">
        <header className="flex items-center p-2 bg-card border-b border-border rounded-t-lg">
          <div className="flex gap-1.5">
            <button onClick={() => setIsOpen(false)} className="w-3.5 h-3.5 bg-red-500 rounded-full"></button>
            <div className="w-3.5 h-3.5 bg-yellow-500 rounded-full"></div>
            <div className="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2 mx-4 flex-1">
            <button className="text-muted-foreground/50"><ArrowLeft size={16}/></button>
            <button className="text-muted-foreground/50"><ArrowRight size={16}/></button>
            <button onClick={() => setCurrentUrl(prev => prev + '')} className="text-muted-foreground hover:text-foreground"><RefreshCw size={16}/></button>
            <button onClick={() => setCurrentUrl(url)} className="text-muted-foreground hover:text-foreground"><Home size={16}/></button>
          </div>
          <div className="flex-1 bg-muted rounded-md px-3 py-1 text-sm flex items-center gap-2">
            <Lock size={14} className="text-green-600" />
            <span className="text-muted-foreground truncate">{currentUrl}</span>
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-muted">
                <X size={16} />
            </button>
          </div>
        </header>
        <div className="flex-grow bg-white">
          <iframe
            src={currentUrl}
            title="Social Media"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialBrowserModal;
