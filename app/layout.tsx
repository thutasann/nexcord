import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ModalProvider } from '@/components/providers/modal-provider'
import ProgressBar from '@/components/ui/progress-bar'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nexcord',
  description: 'This is the Discord clone',
  icons: {
    icon: '/fav.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(font.className, 'bg-white dark:bg-[#313338]')}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="discord-theme">
            <ModalProvider />
            <ProgressBar />
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
