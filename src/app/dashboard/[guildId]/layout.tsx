import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { getGuildIconUrl } from '@/lib/discord'

async function getGuildInfo(guildId: string, accessToken: string) {
  try {
    const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    })
    if (!res.ok) return null
    const guilds = await res.json()
    return guilds.find((g: any) => g.id === guildId) ?? null
  } catch {
    return null
  }
}

export default async function GuildLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { guildId: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  const guild = await getGuildInfo(params.guildId, session.accessToken)
  if (!guild) redirect('/dashboard')

  const iconUrl = getGuildIconUrl(params.guildId, guild.icon)

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16 h-[calc(100vh-4rem)]">
        <Sidebar
          guildId={params.guildId}
          guildName={guild.name}
          guildIcon={iconUrl}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
