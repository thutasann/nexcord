'use client'

import CreateServerModal from '@/components/models/CreateServerModal'
import { Fragment, useEffect, useState } from 'react'
import InviteModal from '../models/InviteModal'
import EditServerModal from '../models/EditServerModal'
import MembersModal from '../models/MembersModal'
import CreateChannelModal from '../models/CreateChannelModal'
import LeaveServerModal from '../models/LeaveServerModal'
import DeleteServerModal from '../models/DeleteServerModal'
import DeleteChannelModal from '../models/DeleteChannelModal'
import EditChannelModal from '../models/EditChannelModal'
import MessageFileModal from '../models/MessageFileModal'
import { DeleteMessageModal } from '../models/DeleteMessageModal'

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
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </Fragment>
  )
}
