'use client';
import { useTheme } from 'next-themes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import { themes, type Theme } from '@/lib/themes';

const ThemeSelector = () => {
    const { theme: currentTheme, setTheme } = useTheme();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                    <Palette size={18} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium">Color Palette</p>
                        <div className="grid grid-cols-2 gap-2">
                            {themes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => setTheme(theme.name)}
                                    className="p-2 rounded-md border-2 flex items-center justify-between"
                                    style={{ borderColor: currentTheme === theme.name ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-1">
                                            {Object.values(theme.previewColors).map((color, i) => (
                                                <div
                                                    key={i}
                                                    className="w-4 h-4 rounded-full border-2 border-background"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium capitalize">{theme.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </div>
                                    {currentTheme === theme.name && <Check size={16} className="text-primary" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ThemeSelector;
