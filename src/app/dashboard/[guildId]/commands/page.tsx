'use client'

import { BookOpen, Shield, Settings, BarChart3, Users } from 'lucide-react'

const commandGroups = [
  {
    icon: Settings,
    label: 'Setup',
    color: 'text-accent-bright',
    bg: 'bg-accent/10 border-accent/20',
    commands: [
      { name: '/verify-setup',       perm: 'Manage Server', desc: 'Setup verification method and channel.' },
      { name: '/verify-send',        perm: 'Manage Server', desc: 'Deploy the Verify button to a channel.' },
      { name: '/verify-config',      perm: 'Manage Server', desc: 'View current verification configuration.' },
      { name: '/verify-reset',       perm: 'Administrator', desc: 'Reset all verification settings.' },
    ],
  },
  {
    icon: Users,
    label: 'Roles',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    commands: [
      { name: '/add-verify-role',    perm: 'Manage Server', desc: 'Add a role given after verification (max 4).' },
      { name: '/remove-verify-role', perm: 'Manage Server', desc: 'Remove a role from verification rewards.' },
      { name: '/remove-role',        perm: 'Manage Roles',  desc: 'Manually remove a role from a member.' },
    ],
  },
  {
    icon: BarChart3,
    label: 'Configuration',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    commands: [
      { name: '/set-logs-channel', perm: 'Manage Server', desc: 'Set the channel for verification logs.' },
      { name: '/set-fail-action',  perm: 'Manage Server', desc: 'Set kick/ban/retry on failed verification.' },
    ],
  },
  {
    icon: Shield,
    label: 'General',
    color: 'text-text-secondary',
    bg: 'bg-elevated border-border',
    commands: [
      { name: '/help', perm: 'Everyone', desc: 'View all commands and usage guide.' },
    ],
  },
]

export default function CommandsPage() {
  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">Commands</h1>
        <p className="font-body text-sm text-text-secondary">All available slash commands and their required permissions.</p>
      </div>

      <div className="space-y-5">
        {commandGroups.map(group => (
          <div key={group.label} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${group.bg}`}>
                <group.icon className={`w-4 h-4 ${group.color}`} />
              </div>
              <h2 className="font-display font-semibold text-text-primary">{group.label}</h2>
            </div>
            <div className="divide-y divide-border">
              {group.commands.map(cmd => (
                <div key={cmd.name} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <code className="text-sm font-mono text-accent-bright bg-primary/10 px-2 py-0.5 rounded">
                      {cmd.name}
                    </code>
                    <p className="font-body text-xs text-text-secondary mt-2">{cmd.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs font-body font-medium px-2.5 py-1 rounded-full bg-elevated border border-border text-text-muted">
                    {cmd.perm}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
