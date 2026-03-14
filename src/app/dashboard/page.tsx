'use client'

import { useEffect, useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Shield, Search, RefreshCw } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ServerCard from '@/components/ServerCard'
import { GuildWithStatus } from '@/types'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [guilds, setGuilds] = useState<GuildWithStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchGuilds = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/guilds')
      if (res.ok) setGuilds(await res.json())
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    if (session) fetchGuilds()
    else if (status !== 'loading') setLoading(false)
  }, [session, status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <Navbar />
        <div className="flex flex-col items-center gap-4 mt-16">
          <div className="w-12 h-12 border-2 border-border border-t-accent rounded-full animate-spin" />
          <p className="font-body text-text-muted text-sm">Loading your servers…</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-base noise">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md px-4 mt-16">
            <div className="w-20 h-20 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-accent-bright" />
            </div>
            <h1 className="font-display font-bold text-3xl text-text-primary mb-3">Sign in required</h1>
            <p className="font-body text-text-secondary mb-8">
              Please sign in with your Discord account to access the dashboard.
            </p>
            <button
              onClick={() => signIn('discord')}
              className="px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-body font-semibold transition-all shadow-lg shadow-primary/30"
            >
              Login with Discord
            </button>
          </div>
        </div>
      </div>
    )
  }

  const filtered = guilds.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
  const botGuilds = filtered.filter(g => g.botPresent)
  const otherGuilds = filtered.filter(g => !g.botPresent)

  return (
    <div className="min-h-screen bg-base noise">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display font-bold text-4xl text-text-primary mb-2">
                Hello, {session.user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="font-body text-text-secondary">
                Select a server to manage its verification settings.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border-2 border-border"
                />
              )}
              <div className="text-right">
                <p className="font-body font-semibold text-text-primary text-sm">{session.user?.name}</p>
                <p className="font-body text-text-muted text-xs">{botGuilds.length} server{botGuilds.length !== 1 ? 's' : ''} managed</p>
              </div>
            </div>
          </div>

          {/* Search + refresh */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search servers…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm font-body text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            <button
              onClick={fetchGuilds}
              className="px-4 py-2.5 rounded-xl bg-card border border-border text-text-muted hover:text-text-primary hover:border-border/80 transition-all flex items-center gap-2 text-sm font-body"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Servers where bot is present */}
        {botGuilds.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="font-display font-bold text-text-primary text-lg">
                Servers with MultiV ({botGuilds.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {botGuilds.map(guild => (
                <ServerCard key={guild.id} guild={guild} />
              ))}
            </div>
          </div>
        )}

        {/* Servers without bot */}
        {otherGuilds.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-text-muted" />
              <h2 className="font-display font-bold text-text-primary text-lg">
                Add MultiV ({otherGuilds.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {otherGuilds.map(guild => (
                <ServerCard key={guild.id} guild={guild} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-24">
            <p className="font-body text-text-muted">No servers found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
