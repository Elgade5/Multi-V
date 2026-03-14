'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ChevronDown, LogOut, LayoutDashboard, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-base/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2.5 group">
            <Image src="/icon.png" alt="MultiV" width={32} height={32} className="rounded-lg" />
            <span className="font-display font-bold text-xl text-text-primary tracking-tight">
              Multi<span className="text-accent-bright">V</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <a
              href="https://discord.com/oauth2/authorize?client_id=1439003828639760656&permissions=8&scope=bot%20applications.commands"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-body text-text-secondary hover:text-text-primary hover:bg-elevated transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Invite
            </a>
            <a
              href="https://discord.gg/7h4srGhQc6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-body text-text-secondary hover:text-text-primary hover:bg-elevated transition-all"
            >
              Support
            </a>
          </div>

          <div className="flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-elevated animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-elevated border border-border hover:border-primary/50 transition-all"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? 'User'}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-accent-bright">
                      {session.user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-body font-medium text-text-primary max-w-[120px] truncate">
                    {session.user?.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-elevated border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-body text-text-secondary hover:text-text-primary hover:bg-card transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <div className="h-px bg-border" />
                    <button
                      onClick={() => { setDropdownOpen(false); signOut() }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-body text-red-400 hover:text-red-300 hover:bg-card transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn('discord')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-body font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                Login with Discord
              </button>
            )}
          </div>

        </div>
      </div>

      {dropdownOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
      )}
    </nav>
  )
}