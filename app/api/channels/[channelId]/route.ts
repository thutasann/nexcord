import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { ChannelType, MemberRole } from '@prisma/client'
import { NextResponse } from 'next/server'

interface IBody {
  name: string
  type: ChannelType
}

export async function DELETE(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const profile = await currentProfile()
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Invalid Server ID', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('ChannelID is missing', { status: 400 })
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
          delete: {
            id: params.channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.error('CHANNEL_DELETE', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { channelId: string } }) {
  try {
    const profile = await currentProfile()
    const { name, type } = await (<Promise<IBody>>req.json())
    const { searchParams } = new URL(req.url)
    const serverId = searchParams.get('serverId')

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Invalid Server ID', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('ChannelID is missing', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse('Name cannot be general', {
        status: 400,
      })
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
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: 'general',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.error('CHANNEL_PATCH', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
