'use client'

import { ChannelType, MemberRole } from '@prisma/client'
import { Hash, Mic, Search, ShieldAlert, ShieldCheck, Video } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { useParams, useRouter } from 'next/navigation'

interface IServerSearch {
  data: {
    label: string
    type: 'channel' | 'member'
    data:
      | {
          icon: React.ReactNode
          name: string
          id: string
        }[]
      | undefined
  }[]
}

function ServerSearch({ data }: IServerSearch) {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleRoute = ({ id, type }: { id: string; type: 'channel' | 'member' }) => {
    setOpen(false)

    if (type === 'member') {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }

    if (type === 'channel') {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
        role="button"
        aria-label="search button"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
        <span>Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-sm">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={() => setOpen(false)}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem key={id} onSelect={() => handleRoute({ id, type })}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default ServerSearch
