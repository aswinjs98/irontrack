import Link from "next/link";
import { Dumbbell, Mail, Lock, ChevronRight } from "lucide-react";

export default function Login() {
    return (
        <div className="min-h-screen gym-gradient flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 p-8 md:p-12 rounded-[2.5rem] bg-card border border-border/50 shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />

                <div className="relative text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="p-2 bg-primary rounded-xl">
                            <Dumbbell className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">IRONTRACK</span>
                    </Link>
                    <h2 className="text-3xl font-black text-white">Welcome Back</h2>
                    <p className="text-foreground/60">Log in to track your progress</p>
                </div>

                <form className="relative space-y-6 mt-8" action="/dashboard">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Password</label>
                                <button type="button" className="text-[10px] font-bold text-primary hover:underline">Forgot Password?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all mt-8"
                    >
                        Sign In
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="relative text-center text-sm text-foreground/40 mt-8">
                    Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register now</Link>
                </p>
            </div>
        </div>
    );
}
