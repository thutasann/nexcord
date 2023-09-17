import { currentProfile } from '@/lib/current-profile'
import React from 'react'

interface IMemberIdPage {
  params: {
    memberId: string
    serverId: string
  }
}

async function MemberIdPage({ params }: IMemberIdPage) {
  const profile = await currentProfile()

  return <div>MemberId page</div>
}

export default MemberIdPage
