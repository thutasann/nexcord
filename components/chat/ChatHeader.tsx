import { Hash } from 'lucide-react'
import React from 'react'
import MobileToggle from '../mobile-toggle'
import BlurImage from '../ui/blur-image'

interface IChatHader {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imagUrl?: string
}

function ChatHeader({ serverId, name, type, imagUrl }: IChatHader) {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      {imagUrl ? <BlurImage src={imagUrl!} width={29} height={29} className="rounded-full mr-2" alt={name} /> : null}
      <MobileToggle serverId={serverId} />
      {type === 'channel' && <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />}
      <p className="font-semibold text-md text-black dark:text-white">{name}</p>
    </div>
  )
}

export default ChatHeader
