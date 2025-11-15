'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { List, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GlareHover from './GlareHover';

type ViewType = 'pie' | 'bar' | 'list';

interface DemographicData {
  title: string;
  data: { name: string; value: number; color: string }[];
}

const DemographicChart = ({ title, data }: DemographicData) => {
    const [view, setView] = useState<ViewType>('pie');

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
        if (active && payload && payload.length) {
            const dataPoint = payload[0].payload;
            return (
                <div className="bg-popover p-2 border border-border rounded-lg shadow-lg">
                    <p className="label text-popover-foreground">{`${dataPoint.name} : ${dataPoint.value.toFixed(1)}%`}</p>
                </div>
            );
        }
        return null;
    };
    
    const chartVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <GlareHover>
            <Card className="bg-card/50 backdrop-blur-sm border-border h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-2xl">{title}</CardTitle>
                    <div className="flex gap-1 bg-muted p-1 rounded-lg">
                        <Button variant={view === 'pie' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('pie')} className="w-8 h-8">
                            <PieChartIcon className="w-4 h-4" />
                        </Button>
                         <Button variant={view === 'bar' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('bar')} className="w-8 h-8">
                            <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')} className="w-8 h-8">
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent style={{ height: '350px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={view}
                            variants={chartVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="w-full h-full"
                        >
                            {view === 'pie' && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name">
                                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                            {view === 'bar' && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                        <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent) / 0.1)' }}/>
                                        <Bar dataKey="value" background={{ fill: 'hsl(var(--muted) / 0.2)' }}>
                                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                            {view === 'list' && (
                                <div className="h-full overflow-y-auto pr-2">
                                    <ul className="space-y-2">
                                        {data.map(item => (
                                            <li key={item.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                    <span className="font-medium text-sm">{item.name}</span>
                                                </div>
                                                <span className="font-bold text-sm">{item.value.toFixed(1)}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </GlareHover>
    );
};

export default DemographicChart;
