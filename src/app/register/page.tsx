"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dumbbell, Mail, Lock, User, Building, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const [role, setRole] = useState<'client' | 'owner'>('client');
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (type === 'gym') {
            setRole('owner');
        } else if (type === 'client') {
            setRole('client');
        }
    }, [type]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        role: role,
                    }
                }
            });

            if (authError) throw authError;

            if (authData.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: authData.user.id,
                            full_name: fullName,
                            role: role,
                        }
                    ]);

                if (profileError) {
                    console.error("Profile creation error:", profileError);
                }

                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                <h2 className="text-3xl font-black text-white">Get Started</h2>
                <p className="text-foreground/60">Choose your account type below</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 group transition-all border-2 ${role === 'client' ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' : 'bg-background border-border/50 hover:border-primary/30'}`}
                >
                    <User className={`w-6 h-6 ${role === 'client' ? 'text-primary' : 'text-foreground/20 group-hover:text-primary/50'}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${role === 'client' ? 'text-primary' : 'text-foreground/40 group-hover:text-primary/50'}`}>Client</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole('owner')}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-2 group transition-all border-2 ${role === 'owner' ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5' : 'bg-background border-border/50 hover:border-primary/30'}`}
                >
                    <Building className={`w-6 h-6 ${role === 'owner' ? 'text-primary' : 'text-foreground/20 group-hover:text-primary/50'}`} />
                    <span className={`text-xs font-bold uppercase tracking-widest ${role === 'owner' ? 'text-primary' : 'text-foreground/40 group-hover:text-primary/50'}`}>Gym Owner</span>
                </button>
            </div>

            <form className="relative space-y-4 mt-6" onSubmit={handleRegister}>
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-border/50 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-white placeholder:text-foreground/20"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all mt-6 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            Create Account
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <p className="relative text-center text-sm text-foreground/40 mt-8">
                Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
            </p>
        </div>
    );
}

export default function Register() {
    return (
        <div className="min-h-screen gym-gradient flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="w-12 h-12 text-primary animate-spin" />}>
                <RegisterForm />
            </Suspense>
        </div>
    );
}
