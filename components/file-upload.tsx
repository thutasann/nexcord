'use client'

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import { FileIcon, X } from 'lucide-react'
import BlurImage from './ui/blur-image'

interface IFileUpload {
  value: string
  onChange: (url?: string) => void
  endPoint: 'messageFile' | 'serverImage'
}

function FileUpload({ value, onChange, endPoint }: IFileUpload) {
  const fileType = value?.split('.').pop()

  if (value && fileType !== 'pdf') {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="relative h-32 w-32 ">
          <BlurImage fill src={value} alt="Upload" className="rounded-full object-cover" />
          <button
            onClick={() => onChange('')}
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-rose-400"
            type="button"
          >
            <X />
          </button>
        </div>
      </div>
    )
  }

  if (value && fileType === 'pdf') {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-200" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm hover:bg-rose-400"
          type="button"
        >
          <X />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].fileUrl)
      }}
      onUploadError={(error: Error) => {
        console.log(error)
      }}
    />
  )
}

export default FileUpload
