import { getAuth } from '@clerk/nextjs/server'
import { db } from './db'
import { NextApiRequest } from 'next'

/**
 * Get Currnet User Profile for Page router API
 */
export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req)

  if (!userId) {
    return null
  }

  return await db.profile.findUnique({
    where: {
      userId,
    },
  })
}
