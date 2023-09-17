'use client'

import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import ActionTooltip from '../action-tooltip'
import BlurImage from './blur-image'
import Link from 'next/link'

interface INavigationItem {
  id: string
  imageUrl: string
  name: string
}

function NavigationItem({ id, imageUrl, name }: INavigationItem) {
  const params = useParams()

  return (
    <ActionTooltip side="right" align="center" label={name}>
      {/* ok */}
      <Link href={`/servers/${id}`} aria-label="server" className="group relative flex items-center mb-4">
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            params?.serverId !== id && 'group-hover:h-[20px]',
            params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <div
          className={cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            params?.serverId === id && 'bg-primary/10 text-primary rounded-[16px]'
          )}
        >
          <BlurImage fill sizes="48px" src={imageUrl} alt={name} />
        </div>
      </Link>
    </ActionTooltip>
  )
}

export default NavigationItem
