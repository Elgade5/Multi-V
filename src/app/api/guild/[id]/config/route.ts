import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { hasManageGuild } from '@/lib/discord'

async function canManageGuild(accessToken: string, guildId: string): Promise<boolean> {
  try {
    const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 0 },
    })
    if (!res.ok) return false
    const guilds = await res.json()
    const guild = guilds.find((g: any) => g.id === guildId)
    return guild ? hasManageGuild(guild.permissions) : false
  } catch {
    return false
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: config } = await supabase
    .from('guild_configs')
    .select('*')
    .eq('guild_id', params.id)
    .single()

  const { data: roles } = await supabase
    .from('guild_roles')
    .select('role_id')
    .eq('guild_id', params.id)

  return NextResponse.json({ config, roles: roles ?? [] })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.accessToken) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const allowed = await canManageGuild(session.accessToken, params.id)
  if (!allowed) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()

  const { error } = await supabase
    .from('guild_configs')
    .upsert({ guild_id: params.id, ...body }, { onConflict: 'guild_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
