import Link from "next/link";
import { Dumbbell, Utensils, TrendingUp, Users, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen gym-gradient selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              IRON<span className="text-primary tracking-widest">TRACK</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
                <span className="text-xs font-semibold tracking-wide uppercase">Built for Gyms</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                Track Progress. <br />
                <span className="text-transparent bg-clip-text accent-gradient">Crush Goals.</span>
              </h1>
              <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                The ultimate calorie and macro tracking companion for serious athletes.
                Whether you're a gym owner or a solo shredder, IronTrack keeps you on target.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/register?type=client"
                  className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
                >
                  Join as Client
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/register?type=gym"
                  className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-secondary/80 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-border"
                >
                  Register Your Gym
                </Link>
              </div>
            </div>
          </div>

          {/* Subtle grid background */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(var(--primary) 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 border-t border-border/40 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Precision Tracking</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Log your meals with ease and get instant breakdowns of protein, carbs, and fats.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-card border border-border/50 hover:border-accent/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Growth Analytics</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Visualize your weight and macro trends over time to ensure you stay in your anabolic window.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Gym Integration</h3>
                <p className="text-foreground/60 leading-relaxed">
                  Allow your coach to monitor your progress and adjust your targets in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/40 text-center text-foreground/40">
        <div className="container mx-auto px-4">
          <p className="text-sm">© 2026 IronTrack. Built for elite performance.</p>
        </div>
      </footer>
    </div>
  );
}
