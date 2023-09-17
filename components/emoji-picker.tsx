'use client'

import React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Smile } from 'lucide-react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useTheme } from 'next-themes'

interface IEmojiPicker {
  onChange: (value: string) => void
}

function EmojiPicker({ onChange }: IEmojiPicker) {
  const { resolvedTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker theme={resolvedTheme} data={data} onEmojiSelect={(emoji: any) => onChange(emoji.native)} />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
