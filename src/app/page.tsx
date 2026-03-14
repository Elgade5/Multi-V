'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Zap, BarChart3, Lock, Users, CheckCircle, ArrowRight, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import GallerySection from '@/components/GallerySection'
import { getBotInviteUrl } from '@/lib/discord'

const features = [
  { icon: Shield,     title: '7 Verification Methods', desc: 'Text, buttons, dropdowns, math challenges, CAPTCHA image, and emoji selection.' },
  { icon: BarChart3,  title: 'Real-Time Logging',       desc: 'Every verification attempt logged instantly — started, success, failed, and role changes.' },
  { icon: Zap,        title: 'Persistent Cooldowns',    desc: 'Anti-spam cooldowns survive bot restarts. Stored securely in your database.' },
  { icon: Lock,       title: 'Fail Actions',            desc: 'Automatically kick or ban users who fail the verification challenge.' },
  { icon: Users,      title: 'Auto Role Assignment',    desc: 'Grant up to 4 roles automatically when a member successfully verifies.' },
  { icon: CheckCircle,title: 'CAPTCHA Modal',           desc: 'Server-side CAPTCHA with ephemeral embed + modal. No DM required.' },
]

const steps = [
  { num: '01', title: 'Run /verify-setup',    desc: 'Choose your verification method and target channel.' },
  { num: '02', title: 'Run /add-verify-role', desc: 'Add up to 4 roles to assign on successful verification.' },
  { num: '03', title: 'Run /verify-send',     desc: 'Deploy the Verify button to your channel — done.' },
]

export default function HomePage() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-base noise">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-accent-bright text-sm font-body font-medium mb-8 animate-fade-in">
            <Star className="w-3.5 h-3.5 fill-current" />
            Professional Discord Verification System
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl text-text-primary leading-[0.9] mb-6 animate-slide-up">
            Secure Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-bright">
              Discord Server
            </span>
          </h1>

          <p className="font-body text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            MultiV gives you 7 powerful verification methods, persistent cooldowns, advanced logging, and a beautiful dashboard — all in one bot.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {session ? (
              <Link
                href="/dashboard"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-body font-semibold text-lg transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 animate-glow-pulse"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                onClick={() => signIn('discord')}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-body font-semibold text-lg transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 animate-glow-pulse"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.057a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Login with Discord
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <a
              href={getBotInviteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-elevated border border-border hover:border-primary/50 text-text-primary font-body font-semibold text-lg transition-all"
            >
              Invite MultiV
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-border bg-card/50 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Verification Methods', value: '7' },
            { label: 'Max Roles Per Server', value: '4' },
            { label: 'Cooldown Persistence', value: '✓' },
          ].map(stat => (
            <div key={stat.label}>
              <p className="font-display font-black text-3xl text-accent-bright">{stat.value}</p>
              <p className="font-body text-sm text-text-secondary mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-bright text-xs font-body font-medium mb-4">
              Features
            </span>
            <h2 className="font-display font-bold text-4xl text-text-primary mb-4">
              Everything you need to verify
            </h2>
            <p className="text-text-secondary font-body max-w-lg mx-auto">
              Built for reliability, security, and ease of use — from small communities to large Discord servers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group bg-card border border-border hover:border-primary/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                  <f.icon className="w-5 h-5 text-accent-bright" />
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">{f.title}</h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup steps */}
      <section className="py-24 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-bright text-xs font-body font-medium mb-4">
              Quick Setup
            </span>
            <h2 className="font-display font-bold text-4xl text-text-primary">
              Ready in under 2 minutes
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={step.num} className="flex gap-6 items-start pl-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary border border-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="font-display font-black text-xs text-white">{step.num}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display font-semibold text-text-primary mb-1">{step.title}</h3>
                    <p className="font-body text-sm text-text-secondary">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <GallerySection />

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-card border border-border rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 pointer-events-none" />
            <div className="relative">
              <h2 className="font-display font-black text-4xl text-text-primary mb-4">
                Ready to secure your server?
              </h2>
              <p className="font-body text-text-secondary mb-8">
                Add MultiV to your Discord server and have verification running in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={getBotInviteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-body font-semibold transition-all shadow-lg shadow-primary/30"
                >
                  Add to Discord
                </a>
                {!session && (
                  <button
                    onClick={() => signIn('discord')}
                    className="px-8 py-3.5 rounded-2xl bg-elevated border border-border hover:border-primary/50 text-text-primary font-body font-semibold transition-all"
                  >
                    Login to Dashboard
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="font-display font-bold text-text-primary">MultiV</span>
            <span className="font-body text-text-muted text-sm">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href={getBotInviteUrl()} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-text-muted hover:text-text-secondary transition-colors">Invite</a>
            <a href="https://discord.gg/7h4srGhQc6" target="_blank" rel="noopener noreferrer" className="text-sm font-body text-text-muted hover:text-text-secondary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
