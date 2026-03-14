'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { BarChart3, CheckCircle2, XCircle, AlertCircle, ChevronDown } from 'lucide-react'
import SaveBar from '@/components/SaveBar'
import { useToast } from '@/context/ToastContext'
import { clsx } from 'clsx'

const logEvents = [
  { id: 'started', icon: AlertCircle, label: 'Verification Started', desc: 'When a user clicks the Verify button', color: 'text-amber-400' },
  { id: 'success', icon: CheckCircle2, label: 'Verification Success', desc: 'When a user passes the challenge', color: 'text-emerald-400' },
  { id: 'failed',  icon: XCircle,     label: 'Verification Failed',  desc: 'When a user answers incorrectly', color: 'text-red-400' },
  { id: 'roles',   icon: BarChart3,   label: 'Role Changes',         desc: 'When any member gains or loses a role', color: 'text-accent-bright' },
]

export default function LogsPage() {
  const { guildId } = useParams<{ guildId: string }>()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [channels, setChannels] = useState<{ id: string; name: string }[]>([])
  const [logsChannelId, setLogsChannelId] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/guild/${guildId}/config`).then(r => r.json()),
      fetch(`/api/guild/${guildId}/channels`).then(r => r.json()),
    ]).then(([cfg, ch]) => {
      const val = cfg.config?.logs_channel_id ?? null
      setLogsChannelId(val)
      setSaved(val)
      setChannels(ch)
      setLoading(false)
    })
  }, [guildId])

  const handleChange = (val: string | null) => {
    setLogsChannelId(val)
    setIsDirty(val !== saved)
  }

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch(`/api/guild/${guildId}/config`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logs_channel_id: logsChannelId }),
    })
    if (res.ok) {
      setSaved(logsChannelId)
      setIsDirty(false)
      addToast({ type: 'success', title: 'Logs channel saved!' })
    } else {
      addToast({ type: 'error', title: 'Failed to save' })
    }
    setSaving(false)
  }

  const selectedChannel = channels.find(c => c.id === logsChannelId)

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="p-6 pb-24 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">Logs Settings</h1>
        <p className="font-body text-sm text-text-secondary">Configure where verification logs are sent.</p>
      </div>

      <div className="space-y-5">
        {/* Channel selector */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-accent-bright" />
            </div>
            <div className="flex-1">
              <h2 className="font-display font-semibold text-text-primary">Logs Channel</h2>
              <p className="text-xs font-body text-text-muted">Channel where events are logged</p>
            </div>
            <button
              type="button"
              onClick={() => handleChange(logsChannelId ? null : (channels[0]?.id ?? null))}
              className={clsx(
                'relative w-12 h-6 rounded-full transition-colors',
                logsChannelId ? 'bg-primary' : 'bg-elevated border border-border'
              )}
            >
              <span className={clsx(
                'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
                logsChannelId ? 'left-7' : 'left-1'
              )} />
            </button>
          </div>
          {logsChannelId !== null && (
            <div className="p-6">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-elevated border border-border hover:border-primary/50 text-sm font-body transition-colors"
                >
                  <span className={selectedChannel ? 'text-text-primary' : 'text-text-muted'}>
                    {selectedChannel ? `# ${selectedChannel.name}` : 'Select a channel…'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute z-50 mt-2 w-full bg-elevated border border-border rounded-xl shadow-2xl max-h-56 overflow-y-auto animate-fade-in">
                      {channels.map(ch => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => { handleChange(ch.id); setDropdownOpen(false) }}
                          className={clsx(
                            'w-full px-4 py-3 text-left text-sm font-body hover:bg-card transition-colors',
                            ch.id === logsChannelId ? 'text-accent-bright bg-primary/10' : 'text-text-primary'
                          )}
                        >
                          # {ch.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Events overview */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="font-display font-semibold text-text-primary">Logged Events</h2>
            <p className="text-xs font-body text-text-muted mt-0.5">All events are always logged when a channel is configured.</p>
          </div>
          <div className="p-6 space-y-3">
            {logEvents.map(ev => (
              <div key={ev.id} className="flex items-center gap-4 p-3 rounded-xl bg-elevated border border-border">
                <ev.icon className={`w-5 h-5 shrink-0 ${ev.color}`} />
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-text-primary">{ev.label}</p>
                  <p className="font-body text-xs text-text-muted">{ev.desc}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDirty && <SaveBar onSave={handleSave} onDiscard={() => { setLogsChannelId(saved); setIsDirty(false) }} saving={saving} />}
    </div>
  )
}
