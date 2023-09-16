'use client'

import CreateServerModal from '@/components/models/CreateServerModal'
import { Fragment, useEffect, useState } from 'react'
import InviteModal from '../models/InviteModal'
import EditServerModal from '../models/EditServerModal'
import MembersModal from '../models/MembersModal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Fragment>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
    </Fragment>
  )
}
