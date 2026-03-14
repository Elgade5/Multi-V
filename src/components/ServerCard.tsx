'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Settings, Plus, Users } from 'lucide-react'
import { GuildWithStatus } from '@/types'
import { getBotInviteUrl } from '@/lib/discord'

export default function ServerCard({ guild }: { guild: GuildWithStatus }) {
  const router = useRouter()

  return (
    <div className="group relative bg-card border border-border hover:border-primary/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
      {/* Guild icon */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          {guild.iconUrl ? (
            <Image
              src={guild.iconUrl}
              alt={guild.name}
              width={72}
              height={72}
              className="rounded-2xl"
              unoptimized
            />
          ) : (
            <div className="w-[72px] h-[72px] rounded-2xl bg-elevated border border-border flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-text-muted">
                {guild.name[0]?.toUpperCase()}
              </span>
            </div>
          )}
          {/* Bot presence indicator */}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${guild.botPresent ? 'bg-emerald-500' : 'bg-text-muted'}`} />
        </div>

        <div className="text-center">
          <p className="font-body font-semibold text-text-primary text-sm leading-tight max-w-[120px] truncate">
            {guild.name}
          </p>
          <p className="text-xs font-body text-text-muted mt-0.5">
            {guild.botPresent ? 'Bot active' : 'Bot not added'}
          </p>
        </div>

        {guild.botPresent ? (
          <Link
            href={`/dashboard/${guild.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-body font-medium transition-all"
            onClick={e => e.stopPropagation()}
          >
            <Settings className="w-3.5 h-3.5" />
            Manage
          </Link>
        ) : (
          <a
            href={getBotInviteUrl(guild.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-elevated hover:bg-border border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary text-sm font-body font-medium transition-all"
            onClick={e => e.stopPropagation()}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Bot
          </a>
        )}
      </div>
    </div>
  )
}
