import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 md:px-6 flex items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} YBT Connect Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
