import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserGuilds, hasManageGuild, getGuildIconUrl } from '@/lib/discord'

// Fetch guild IDs where the bot is present via Discord API
async function getBotGuildIds(): Promise<Set<string>> {
  try {
    const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: { Authorization: `Bot ${process.env.DISCORD_TOKEN}` },
      next: { revalidate: 30 },
    })
    if (!res.ok) return new Set()
    const guilds = await res.json()
    return new Set(guilds.map((g: any) => g.id as string))
  } catch {
    return new Set()
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [userGuilds, botGuildIds] = await Promise.all([
      getUserGuilds(session.accessToken),
      getBotGuildIds(),
    ])

    const filtered = userGuilds
      .filter((g: any) => hasManageGuild(g.permissions))
      .map((g: any) => ({
        id: g.id,
        name: g.name,
        icon: g.icon,
        iconUrl: getGuildIconUrl(g.id, g.icon),
        botPresent: botGuildIds.has(g.id),
        owner: g.owner,
      }))
      .sort((a: any, b: any) => Number(b.botPresent) - Number(a.botPresent))

    return NextResponse.json(filtered)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch guilds' }, { status: 500 })
  }
}
