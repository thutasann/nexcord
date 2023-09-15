import { ModeToggle } from '@/components/theme/mode-toggle'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  )
}
