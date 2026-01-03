import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, Zap, BarChart3, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
            <Rocket className="h-6 w-6" />
            Landing Builder
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:text-blue-600 transition-colors">Sign In</Link>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                Validate your Micro-SaaS in <span className="text-blue-600">Minutes</span>, not Days.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600 md:text-2xl">
                The all-in-one platform to create, host, and validate high-conversion landing pages with plug-and-play integrations.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700">
                  <Link href="/sign-up">Create my landing now 🚀</Link>
                </Button>
                <Link href="#features" className="text-sm font-semibold text-neutral-400 hover:text-neutral-900 transition-colors">
                  See how it works ↷
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-white border-t border-neutral-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to validate your idea</h2>
              <p className="mt-4 text-neutral-500">Native tools ready to use, no infrastructure setup required.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-yellow-500" />}
                title="Deploy in 5 minutes"
                description="From idea to live site without code. Choose a template and start capturing."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-6 w-6 text-blue-500" />}
                title="Plug-and-Play Integrations"
                description="Resend, Stripe, and Cal.com ready to go. Set up in seconds."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-green-500" />}
                title="Built-in Analytics"
                description="Real-time validation metrics. Know exactly how much your page converts."
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6 text-purple-500" />}
                title="Easy Custom Domains"
                description="Connect your own domain in 2 clicks with automatic SSL included."
              />
              <FeatureCard
                icon={<Rocket className="h-6 w-6 text-red-500" />}
                title="AI Copy Generator"
                description="Generate persuasive text and impactful headlines with help from our AI."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-orange-500" />}
                title="Unlimited Scale"
                description="Hosted on Vercel Edge Network for global performance and near-instant loading."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-100 py-12 bg-neutral-50">
        <div className="container mx-auto px-4 text-center md:px-6">
          <p className="text-sm text-neutral-500">© 2026 Landing Builder. Built for Solopreneurs.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-blue-100">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-50 transition-colors group-hover:bg-blue-50">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-neutral-500 leading-relaxed">{description}</p>
    </div>
  );
}
