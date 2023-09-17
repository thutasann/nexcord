'use client'

import { cn } from '@/lib/utils'
import { Member, MemberRole, Profile, Server } from '@prisma/client'
import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { UserAvatar } from '../user-avatar'
import Link from 'next/link'

interface IServerMember {
  member: Member & {
    profile: Profile
  }
  server: Server
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
}

function ServerMember({ member, server }: IServerMember) {
  const params = useParams()
  const icon = roleIconMap[member.role]

  return (
    <Link
      href={`/servers/${params?.serverId}/conversations/${member.id}`}
      prefetch
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params?.memberId === member.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
      <p
        className={cn(
          'font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition',
          params?.memberId === member.id && 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </Link>
  )
}

export default ServerMember
