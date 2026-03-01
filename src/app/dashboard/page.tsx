"use client";

import { useState } from "react";
import { Plus, Search, Calendar, User, Settings, LogOut, ChevronRight, PieChart, Activity, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";
import FoodLogger from "@/components/FoodLogger";
import { MOCK_LOGS, USER_GOALS } from "@/lib/mock-data";

export default function Dashboard() {
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [view, setView] = useState<'client' | 'gym'>('client');
    const today = MOCK_LOGS[6];

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground">
            {/* Sidebar for Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/50 p-6 space-y-8">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary rounded-lg">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">IRONTRACK</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <button
                        onClick={() => setView('client')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${view === 'client' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/60 hover:text-primary hover:bg-primary/5'}`}
                    >
                        <PieChart className="w-5 h-5" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setView('gym')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${view === 'gym' ? 'bg-accent/10 text-accent font-bold' : 'text-foreground/60 hover:text-accent hover:bg-accent/5'}`}
                    >
                        <ShieldCheck className="w-5 h-5" />
                        Gym Manager
                    </button>
                    <Link href="/logs" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all">
                        <Calendar className="w-5 h-5" />
                        Daily Logs
                    </Link>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground/60 hover:text-primary hover:bg-primary/5 transition-all">
                        <User className="w-5 h-5" />
                        Profile
                    </Link>
                </nav>

                <div className="pt-8 border-t border-border/40 space-y-1">
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-foreground/60 hover:text-primary transition-all">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                    <Link href="/login" className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all text-left">
                        <LogOut className="w-5 h-5" />
                        Log out
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto pb-32 md:pb-8">
                {/* Header */}
                <header className="h-16 border-b border-border/40 flex items-center justify-between px-4 md:px-8 bg-background/50 backdrop-blur-sm sticky top-0 z-40">
                    <h2 className="text-xl font-bold">{view === 'client' ? 'Good Morning, Alex' : 'Gym Management'}</h2>
                    <div className="flex items-center gap-3">
                        <button className="p-2 border border-border rounded-full hover:bg-white/5 transition-colors hidden sm:block">
                            <Search className="w-5 h-5 text-foreground/60" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">AA</span>
                        </div>
                    </div>
                </header>

                {view === 'client' ? (
                    <section className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                        {/* Progress Overview Card */}
                        <div className="p-8 rounded-[2rem] bg-card border border-border/50 relative overflow-hidden group shadow-2xl shadow-black/20">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                        <circle
                                            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                                            strokeDasharray="552.92"
                                            strokeDashoffset={552.92 * (1 - today.calories / USER_GOALS.calories)}
                                            className="text-primary transition-all duration-1000 ease-in-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                        <span className="text-4xl font-black text-white">{USER_GOALS.calories - today.calories}</span>
                                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Kcal Left</span>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Consumed</span>
                                        <p className="text-2xl font-black">{today.calories}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Burned</span>
                                        <p className="text-2xl font-black">420</p>
                                    </div>
                                    <div className="space-y-1 hidden lg:block">
                                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Net Calories</span>
                                        <p className="text-2xl font-black">{today.calories - 420}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsLogOpen(true)}
                                    className="p-5 bg-primary text-white rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Plus className="w-8 h-8" />
                                </button>
                            </div>
                        </div>

                        {/* Macros Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: 'Protein', value: today.protein, target: USER_GOALS.protein, color: 'bg-primary' },
                                { label: 'Carbs', value: today.carbs, target: USER_GOALS.carbs, color: 'bg-accent' },
                                { label: 'Fats', value: today.fats, target: USER_GOALS.fats, color: 'bg-orange-500' }
                            ].map((macro) => (
                                <div key={macro.label} className="p-6 rounded-3xl bg-card border border-border/50 space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-extrabold text-foreground/40 uppercase tracking-widest">{macro.label}</span>
                                        <span className="text-base font-black">{macro.value}g / {macro.target}g</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${macro.color} transition-all duration-1000 ease-out`}
                                            style={{ width: `${Math.min(100, (macro.value / macro.target) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Daily Log
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Oatmeal with Blueberries', time: '8:30 AM', cal: 340, type: 'Breakfast' },
                                    { name: 'Grilled Chicken Breast', time: '12:45 PM', cal: 450, type: 'Lunch' },
                                    { name: 'Whey Protein Shake', time: '3:00 PM', cal: 120, type: 'Snack' }
                                ].map((meal, idx) => (
                                    <div key={idx} className="p-4 rounded-2xl bg-card/40 border border-border/30 hover:bg-card/60 transition-all flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-secondary rounded-xl text-foreground/20 group-hover:text-primary transition-colors">
                                                <Plus className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm md:text-base">{meal.name}</h4>
                                                <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-tighter">{meal.type} • {meal.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-primary">{meal.cal} <span className="text-[10px] text-foreground/40 font-bold">KCAL</span></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Clients', value: '42', icon: User, color: 'text-primary' },
                                { label: 'Avg Compliance', value: '88%', icon: Activity, color: 'text-accent' },
                                { label: 'Pending Checks', value: '5', icon: Target, color: 'text-orange-500' },
                                { label: 'Gym Rating', value: '4.9', icon: ShieldCheck, color: 'text-blue-400' },
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-card border border-border/50 space-y-4">
                                    <div className={`p-3 rounded-xl bg-white/5 w-fit ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{stat.label}</p>
                                        <p className="text-3xl font-black">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Active Clients</h3>
                            <div className="overflow-hidden rounded-3xl border border-border/50 bg-card">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 border-b border-border/50">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Client</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Calorie Status</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Protein</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {[
                                            { name: 'Alex Johnson', status: 'On Track', cal: '1260/3000', protein: '140g/200g', color: 'text-primary' },
                                            { name: 'Sarah Miller', status: 'Over Limit', cal: '3200/2800', protein: '180g/180g', color: 'text-red-400' },
                                            { name: 'Michael Chen', status: 'Pending', cal: '0/3500', protein: '0g/250g', color: 'text-orange-500' },
                                        ].map((client, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4 font-bold">{client.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full bg-white/5 ${client.color}`}>
                                                        {client.status}
                                                    </span>
                                                    <p className="text-xs text-foreground/40 mt-1 font-medium">{client.cal} kcal</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold">{client.protein}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-all">
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Mobile Nav */}
            <nav className="md:hidden border-t border-border bg-card/80 backdrop-blur-lg fixed bottom-0 w-full px-6 py-4 flex justify-between items-center z-50">
                <button onClick={() => setView('client')} className={view === 'client' ? 'text-primary' : 'text-foreground/40'}><PieChart className="w-6 h-6" /></button>
                <button onClick={() => setView('gym')} className={view === 'gym' ? 'text-accent' : 'text-foreground/40'}><ShieldCheck className="w-6 h-6" /></button>

                <button
                    onClick={() => setIsLogOpen(true)}
                    className="p-3 bg-primary rounded-full -mt-12 shadow-xl shadow-primary/40 border-4 border-background active:scale-95 transition-all"
                >
                    <Plus className="w-6 h-6 text-white" />
                </button>

                <Link href="/profile" className="text-foreground/40"><User className="w-6 h-6" /></Link>
                <Link href="/settings" className="text-foreground/40"><Settings className="w-6 h-6" /></Link>
            </nav>

            <FoodLogger isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />
        </div>
    );
}
