'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Users, Info } from 'lucide-react'

export default function RolesPage() {
  const { guildId } = useParams<{ guildId: string }>()
  const [roles, setRoles] = useState<{ role_id: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/guild/${guildId}/config`)
      .then(r => r.json())
      .then(d => { setRoles(d.roles ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [guildId])

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">Verified Roles</h1>
        <p className="font-body text-sm text-text-secondary">
          Roles assigned to members after successful verification. Manage them using{' '}
          <code className="text-accent-bright text-xs bg-primary/15 px-1.5 py-0.5 rounded">/add-verify-role</code> and{' '}
          <code className="text-accent-bright text-xs bg-primary/15 px-1.5 py-0.5 rounded">/remove-verify-role</code>.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-accent-bright" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-text-primary">Configured Roles</h2>
            <p className="text-xs font-body text-text-muted">{roles.length} / 4 roles configured</p>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
            </div>
          ) : roles.length === 0 ? (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-elevated border border-border">
              <Info className="w-4 h-4 text-text-muted mt-0.5 shrink-0" />
              <div>
                <p className="font-body text-sm font-medium text-text-primary">No roles configured yet</p>
                <p className="font-body text-xs text-text-muted mt-0.5">
                  Use <code className="text-accent-bright">/add-verify-role</code> in your Discord server to add up to 4 roles.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {roles.map(r => (
                <div key={r.role_id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-elevated border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div>
                      <p className="font-body text-sm font-medium text-text-primary">Role ID</p>
                      <p className="font-body text-xs font-mono text-text-muted">{r.role_id}</p>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-xs font-body text-text-muted mt-2 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Role names are resolved live in Discord. Use the slash commands to manage roles.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="font-body text-sm font-medium text-text-primary">Role capacity</span>
          <span className="font-body text-sm text-text-muted">{roles.length} / 4</span>
        </div>
        <div className="w-full h-2 bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${(roles.length / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
