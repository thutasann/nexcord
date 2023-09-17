'use client'

import React, { memo } from 'react'
import { useSocket } from './providers/socket.provider'
import { Badge } from './ui/badge'

function SocketIndicator() {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white border-none">
        Away
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white border-none">
      Online
    </Badge>
  )
}

export default memo(SocketIndicator)
