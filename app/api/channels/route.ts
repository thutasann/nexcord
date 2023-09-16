import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

interface IBody {
  name: string
  type: ChannelType
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)
    const { name, type } = await (<Promise<IBody>>req.json())
    const serverId = searchParams.get('serverId')

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Invalid Server Id', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse('Name cannot be general', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.error('CHANNEL_POST', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
