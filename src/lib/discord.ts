const DISCORD_API = 'https://discord.com/api/v10'

export async function getUserGuilds(accessToken: string) {
  const res = await fetch(`${DISCORD_API}/users/@me/guilds`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error('Failed to fetch guilds')
  return res.json()
}

export async function getGuildChannels(guildId: string) {
  const res = await fetch(`${DISCORD_API}/guilds/${guildId}/channels`, {
    headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
    next: { revalidate: 0 },
  })
  if (!res.ok) return []
  const channels = await res.json()
  // Return only text channels (type 0) sorted by position
  return channels
    .filter((c: any) => c.type === 0)
    .sort((a: any, b: any) => a.position - b.position)
}

export function hasManageGuild(permissions: string): boolean {
  return (BigInt(permissions) & BigInt(0x20)) === BigInt(0x20)
}

export function getGuildIconUrl(guildId: string, icon: string | null): string | null {
  if (!icon) return null
  const ext = icon.startsWith('a_') ? 'gif' : 'png'
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.${ext}?size=128`
}

export function getBotInviteUrl(guildId?: string): string {
  const base = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_ID ?? '1439003828639760656'}&permissions=8&scope=bot%20applications.commands`
  return guildId ? `${base}&guild_id=${guildId}` : base
}

export const VERIFICATION_METHODS = [
  { value: 1, label: 'Text Selection', description: 'User types 1–4 in DMs' },
  { value: 2, label: 'Button Selection', description: 'User clicks a button in DMs' },
  { value: 3, label: 'Select Menu', description: 'User picks from a dropdown in DMs' },
  { value: 4, label: 'Math Challenge (Text)', description: 'Solve a math problem and type answer' },
  { value: 5, label: 'Math Challenge (Buttons)', description: 'Solve a math problem and click answer' },
  { value: 6, label: 'CAPTCHA Image', description: 'Type the distorted code shown in image' },
  { value: 7, label: 'Emoji Selection', description: 'Click the correct emoji among choices' },
]

export const FAIL_ACTIONS = [
  { value: 'none', label: 'Allow Retry', description: 'User can try again' },
  { value: 'kick', label: 'Kick User', description: 'Kick from server on fail' },
  { value: 'ban', label: 'Ban User', description: 'Ban from server on fail' },
]
