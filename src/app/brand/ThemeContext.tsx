'use client';

import { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';
import { themes, type Theme } from './themes';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, rawSetTheme] = useState('youbtech');
  const [mode, rawSetMode] = useState<'light' | 'dark'>('dark');

  useIsomorphicLayoutEffect(() => {
    const storedTheme = localStorage.getItem('color-theme');
    const storedMode = localStorage.getItem('color-mode');
    
    if (storedTheme && themes.find(t => t.name === storedTheme)) {
        rawSetTheme(storedTheme);
    }

    if (storedMode === 'light' || storedMode === 'dark') {
        rawSetMode(storedMode);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        rawSetMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const setTheme = (newTheme: string) => {
    rawSetTheme(newTheme);
    localStorage.setItem('color-theme', newTheme);
    document.documentElement.className = `theme-${newTheme} ${mode}`;
  };
  
  const setMode = (newMode: 'light' | 'dark') => {
      rawSetMode(newMode);
      localStorage.setItem('color-mode', newMode);
      document.documentElement.className = `theme-${theme} ${newMode}`;
  };

  useEffect(() => {
    document.documentElement.className = `theme-${theme} ${mode}`;
  }, [theme, mode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, setMode, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
