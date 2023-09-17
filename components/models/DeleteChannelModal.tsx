'use client'

import axios from 'axios'
import qs from 'query-string'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-state'
import { useState } from 'react'
import { toast } from '../ui/use-toast'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function DeleteChannelModal() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === 'deleteChannel'
  const { server, channel } = data

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      toast({
        title: 'Delete the server',
      })
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.error(error)
      onClose()
      toast({
        title: 'Something went wrong',
        type: 'background',
      })
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">Delete channel?</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to Delete?
            <br /> <span className="font-bold text-indigo-500"># {channel?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={handleDelete} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteChannelModal
