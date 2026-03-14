'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, BarChart3, Users, BookOpen, Home, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'

const sections = [
  {
    id: 'settings',
    label: 'SETTINGS',
    items: [
      { href: '', label: 'Verification', icon: Shield, description: 'Method, channel & fail action' },
      { href: '/logs', label: 'Logs', icon: BarChart3, description: 'Log channel & events' },
      { href: '/roles', label: 'Roles', icon: Users, description: 'Verified roles overview' },
    ],
  },
  {
    id: 'info',
    label: 'INFO',
    items: [
      { href: '/commands', label: 'Commands', icon: BookOpen, description: 'All slash commands' },
    ],
  },
]

interface SidebarProps {
  guildId: string
  guildName: string
  guildIcon: string | null
}

export default function Sidebar({ guildId, guildName, guildIcon }: SidebarProps) {
  const pathname = usePathname()
  const base = `/dashboard/${guildId}`

  return (
    <aside className="w-64 shrink-0 h-full bg-card border-r border-border flex flex-col">
      {/* Guild header */}
      <div className="p-4 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-2 text-text-muted hover:text-text-secondary transition-colors text-xs font-body mb-3">
          <Home className="w-3 h-3" />
          All Servers
        </Link>
        <div className="flex items-center gap-2.5">
          {guildIcon ? (
            <img src={guildIcon} alt={guildName} className="w-8 h-8 rounded-lg" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-elevated border border-border flex items-center justify-center text-xs font-bold text-text-muted">
              {guildName[0]}
            </div>
          )}
          <div>
            <p className="text-sm font-body font-semibold text-text-primary leading-tight max-w-[160px] truncate">{guildName}</p>
            <p className="text-xs text-text-muted">Bot Active</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {sections.map(section => (
          <div key={section.id} className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-display font-bold tracking-widest text-text-muted uppercase">
              {section.label}
            </p>
            {section.items.map(item => {
              const href = base + item.href
              const active = pathname === href
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all group',
                    active
                      ? 'bg-primary/20 border border-primary/30 text-accent-bright'
                      : 'text-text-secondary hover:text-text-primary hover:bg-elevated'
                  )}
                >
                  <item.icon className={clsx('w-4 h-4 shrink-0', active ? 'text-accent-bright' : 'text-text-muted group-hover:text-text-secondary')} />
                  <span className="text-sm font-body font-medium flex-1">{item.label}</span>
                  {active && <ChevronRight className="w-3 h-3 text-accent" />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-body text-text-muted">MultiV is online</span>
        </div>
      </div>
    </aside>
  )
}
