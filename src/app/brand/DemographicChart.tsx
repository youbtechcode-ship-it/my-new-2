'use client';
import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { List, PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DemographicChart = ({ title, data }) => {
    const [view, setView] = useState('graph'); // 'graph' or 'list'

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-popover p-2 border border-border rounded-lg shadow-lg">
                    <p className="label text-popover-foreground">{`${payload[0].name} : ${payload[0].value.toFixed(1)}%`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl">{title}</CardTitle>
                <div className="flex gap-1 bg-muted p-1 rounded-lg">
                    <Button variant={view === 'graph' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('graph')} className="w-8 h-8">
                        <PieChartIcon className="w-4 h-4" />
                    </Button>
                    <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')} className="w-8 h-8">
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent style={{ height: '300px' }}>
                {view === 'graph' ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full overflow-y-auto">
                        <ul className="space-y-2">
                            {data.map(item => (
                                <li key={item.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <span className="font-bold">{item.value.toFixed(1)}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DemographicChart;
