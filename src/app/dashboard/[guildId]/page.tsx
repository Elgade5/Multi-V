'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Shield, Hash, AlertTriangle, Info, ChevronDown } from 'lucide-react'
import SaveBar from '@/components/SaveBar'
import { useToast } from '@/context/ToastContext'
import { GuildConfig, DiscordChannel } from '@/types'
import { VERIFICATION_METHODS, FAIL_ACTIONS } from '@/lib/discord'
import { clsx } from 'clsx'

interface SelectProps {
  value: string | null
  onChange: (v: string) => void
  options: { value: string; label: string; description?: string }[]
  placeholder?: string
}

function Select({ value, onChange, options, placeholder }: SelectProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const selected = options.find(o => o.value === value)

  const handleOpen = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      setPos({ top: r.bottom + 8, left: r.left, width: r.width })
    }
    setOpen(!open)
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-elevated border border-border hover:border-primary/50 text-sm font-body transition-colors text-left"
      >
        <span className={selected ? 'text-text-primary' : 'text-text-muted'}>
          {selected?.label ?? placeholder ?? 'Select…'}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[9990]" onClick={() => setOpen(false)} />
          <div
            className="fixed z-[9991] bg-elevated border border-border rounded-xl shadow-2xl overflow-y-auto max-h-56 animate-fade-in"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={clsx(
                  'w-full flex flex-col px-4 py-3 text-left hover:bg-card transition-colors',
                  opt.value === value && 'bg-primary/10'
                )}
              >
                <span className={clsx('text-sm font-body font-medium', opt.value === value ? 'text-accent-bright' : 'text-text-primary')}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="text-xs font-body text-text-muted mt-0.5">{opt.description}</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function SectionCard({ icon: Icon, title, description, children }: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-accent-bright" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-text-primary text-base">{title}</h2>
          <p className="text-xs font-body text-text-muted mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

export default function VerificationPage() {
  const { guildId } = useParams<{ guildId: string }>()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [channels, setChannels] = useState<DiscordChannel[]>([])
  const [config, setConfig] = useState<Partial<GuildConfig>>({})
  const [savedConfig, setSavedConfig] = useState<Partial<GuildConfig>>({})
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    const load = async () => {
      const [cfgRes, chRes] = await Promise.all([
        fetch(`/api/guild/${guildId}/config`),
        fetch(`/api/guild/${guildId}/channels`),
      ])
      const { config: cfg } = cfgRes.ok ? await cfgRes.json() : {}
      const ch = chRes.ok ? await chRes.json() : []
      const initial = cfg ?? { fail_action: 'none' }
      setConfig(initial)
      setSavedConfig(initial)
      setChannels(ch)
      setLoading(false)
    }
    load()
  }, [guildId])

  const update = useCallback((patch: Partial<GuildConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...patch }
      setIsDirty(JSON.stringify(next) !== JSON.stringify(savedConfig))
      return next
    })
  }, [savedConfig])

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/guild/${guildId}/config`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })
      if (res.ok) {
        setSavedConfig(config)
        setIsDirty(false)
        addToast({ type: 'success', title: 'Settings saved!', message: 'Your verification settings have been updated.' })
      } else {
        addToast({ type: 'error', title: 'Save failed', message: 'Could not save settings. Please try again.' })
      }
    } catch {
      addToast({ type: 'error', title: 'Network error', message: 'Check your connection and try again.' })
    }
    setSaving(false)
  }

  const discard = () => {
    setConfig(savedConfig)
    setIsDirty(false)
    addToast({ type: 'info', title: 'Changes discarded' })
  }

  const channelOptions = channels.map(c => ({ value: c.id, label: `# ${c.name}` }))
  const methodOptions = VERIFICATION_METHODS.map(m => ({ value: String(m.value), label: m.label, description: m.description }))
  const failOptions = FAIL_ACTIONS.map(f => ({ value: f.value, label: f.label, description: f.description }))

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-border border-t-accent rounded-full animate-spin" />
          <p className="font-body text-text-muted text-sm">Loading settings…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 pb-24 max-w-3xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-text-primary mb-1">Verification Settings</h1>
        <p className="font-body text-sm text-text-secondary">Configure how members verify in your server.</p>
      </div>

      <div className="space-y-5">
        {/* Method */}
        <SectionCard icon={Shield} title="Verification Method" description="Choose how members complete the verification challenge.">
          <Select
            value={config.method != null ? String(config.method) : null}
            onChange={v => update({ method: Number(v) })}
            options={methodOptions}
            placeholder="Select a method…"
          />
          {config.method === 6 && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20">
              <Info className="w-4 h-4 text-accent-bright mt-0.5 shrink-0" />
              <p className="text-xs font-body text-accent-bright">CAPTCHA is ephemeral — no DMs required. Requires <code>Pillow</code> installed on your bot.</p>
            </div>
          )}
        </SectionCard>

        {/* Verification channel */}
        <SectionCard icon={Hash} title="Verification Channel" description="Channel where the Verify button will be deployed.">
          {channels.length === 0 ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs font-body text-amber-400">Could not load channels. Make sure MultiV is in your server.</p>
            </div>
          ) : (
            <Select
              value={config.channel_id ?? null}
              onChange={v => update({ channel_id: v })}
              options={channelOptions}
              placeholder="Select a channel…"
            />
          )}
        </SectionCard>

        {/* Logs channel */}
        <SectionCard icon={Hash} title="Logs Channel" description="Where verification logs (started / success / failed) are sent.">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-sm font-medium text-text-primary">Enable Logs</p>
                <p className="font-body text-xs text-text-muted">Send real-time logs to a channel</p>
              </div>
              <button
                type="button"
                onClick={() => update({ logs_channel_id: config.logs_channel_id ? null : (channels[0]?.id ?? null) })}
                className={clsx(
                  'relative w-12 h-6 rounded-full transition-colors',
                  config.logs_channel_id ? 'bg-primary' : 'bg-elevated border border-border'
                )}
              >
                <span className={clsx(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-all',
                  config.logs_channel_id ? 'left-7' : 'left-1'
                )} />
              </button>
            </div>
            {config.logs_channel_id !== null && config.logs_channel_id !== undefined && (
              <Select
                value={config.logs_channel_id}
                onChange={v => update({ logs_channel_id: v })}
                options={channelOptions}
                placeholder="Select logs channel…"
              />
            )}
          </div>
        </SectionCard>

        {/* Fail action */}
        <SectionCard icon={AlertTriangle} title="Fail Action" description="What happens when a member fails the verification challenge.">
          <Select
            value={config.fail_action ?? 'none'}
            onChange={v => update({ fail_action: v as GuildConfig['fail_action'] })}
            options={failOptions}
          />
          {config.fail_action !== 'none' && config.fail_action && (
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs font-body text-red-400">
                Members who fail verification will be <strong>{config.fail_action}ned</strong> immediately.
                Make sure MultiV has the required permissions.
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      {isDirty && <SaveBar onSave={save} onDiscard={discard} saving={saving} />}
    </div>
  )
}

