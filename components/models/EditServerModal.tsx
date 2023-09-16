'use client'

import axios from 'axios'
import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import FileUpload from '../file-upload'
import { useToast } from '../ui/use-toast'
import { useModal } from '@/hooks/use-modal-state'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required',
  }),
  imageUrl: z.string().min(1, {
    message: 'Server image is required',
  }),
})

function EditServerModal() {
  const { isOpen, onClose, type, data } = useModal()
  const { server } = data
  const isModalOpen = isOpen && type === 'editServer'
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)
      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Something went wrong!',
        type: 'background',
        description: 'Something went wrong in Creating server',
      })
    }
  }

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">Edit your server</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name and image. You can always change it later
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center" />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <FileUpload endPoint="serverImage" value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditServerModal
