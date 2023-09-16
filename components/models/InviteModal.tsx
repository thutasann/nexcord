'use client'

import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-state'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import { useOrigin } from '@/hooks/use-origin'
import { useState } from 'react'
import { toast } from '../ui/use-toast'

function InviteModal() {
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const origin = useOrigin()
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isModalOpen = isOpen && type === 'invite'
  const { server } = data
  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const handleNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
      onOpen('invite', {
        server: response.data,
      })
      toast({
        title: 'New invite code generated',
      })
    } catch (error) {
      console.error(error)
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
          <DialogTitle className="text-2xl text-center">Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">Server invite link</Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
              autoFocus={false}
            />
            <Button onClick={handleCopy} size="icon">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            onClick={handleNew}
            variant="primary"
            size="sm"
            className="text-xs text-white mt-4"
          >
            Generate a new link
            <RefreshCcw className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
