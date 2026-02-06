import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const data = [
    { name: 'Jan', growth: 4000, reach: 2400 },
    { name: 'Feb', growth: 3000, reach: 1398 },
    { name: 'Mar', growth: 2000, reach: 9800 },
    { name: 'Apr', growth: 2780, reach: 3908 },
    { name: 'May', growth: 1890, reach: 4800 },
    { name: 'Jun', growth: 2390, reach: 3800 },
    { name: 'Jul', growth: 3490, reach: 4300 },
];

export const ImpactDashboard = () => {
    const { language } = useLanguage();

    const title = language === 'ru' ? 'Показатели Роста' : language === 'kk' ? 'Өсім Көрсеткіштері' : 'Growth Metrics';
    const reachHeader = language === 'ru' ? 'Охват Аудитории' : language === 'kk' ? 'Аудитория Қамтуы' : 'Audience Reach';

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {language === 'ru' ? 'Наши маркетинговые стратегии обеспечивают стабильный рост для каждого клиента.' : 'Our marketing strategies deliver consistent growth for every client.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium">{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="growth" stroke="#3b82f6" fillOpacity={1} fill="url(#colorGrowth)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader>
                            <CardTitle className="text-xl font-medium">{reachHeader}</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="reach" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
