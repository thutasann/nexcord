import ChatHeader from '@/components/chat/ChatHeader'
import ChatInput from '@/components/chat/ChatInput'
import ChatMessages from '@/components/chat/ChatMessages'
import { MediaRoom } from '@/components/media-room'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'
import { redirectToSignIn } from '@clerk/nextjs'
import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

interface IChannelIDPage {
  params: {
    serverId: string
    channelId: string
  }
}

async function ChannelIdPage({ params: { serverId, channelId } }: IChannelIDPage) {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    redirect('/')
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader serverId={serverId} name={channel.name} type="channel" />
      <ChatMessages
        name={channel.name}
        member={member}
        chatId={channel.id}
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
        type="channel"
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
      {channel.type === ChannelType.AUDIO && <MediaRoom chatId={channel.id} video={false} audio={true} />}
      {channel.type === ChannelType.VIDEO && <MediaRoom chatId={channel.id} video={true} audio={true} />}
    </div>
  )
}

export default ChannelIdPage
