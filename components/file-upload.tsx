'use client'

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'
import BlurImage from './ui/blur-image'
import Image from 'next/image'
import { X } from 'lucide-react'

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
          <BlurImage fill src={value} alt="Upload" className="rounded-full" />
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
