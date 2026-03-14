export interface DiscordGuild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
}

export interface GuildWithStatus extends DiscordGuild {
  botPresent: boolean
  iconUrl: string | null
}

export interface DiscordChannel {
  id: string
  name: string
  type: number
  position: number
  parent_id: string | null
}

export interface GuildConfig {
  guild_id: string
  method: number
  channel_id: string | null
  verification_message_id: string | null
  logs_channel_id: string | null
  fail_action: 'none' | 'kick' | 'ban'
}

export interface GuildRole {
  guild_id: string
  role_id: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}
