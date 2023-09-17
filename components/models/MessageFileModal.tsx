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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import FileUpload from '../file-upload'
import { useToast } from '../ui/use-toast'
import { useModal } from '@/hooks/use-modal-state'

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required',
  }),
})

function MessageFileModal() {
  const { isOpen, onClose, type, data } = useModal()
  const { apiUrl, query } = data
  const isModalOpen = isOpen && type === 'messageFile'
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleClose = () => {
    form.reset()
    onClose()
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl!,
        query,
      })
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      })
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong!',
        type: 'background',
        description: 'Something went wrong in Uploading file',
      })
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">Add an attachment</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">Send a file as a message</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center" />

              <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUpload endPoint="messageFile" value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default MessageFileModal
