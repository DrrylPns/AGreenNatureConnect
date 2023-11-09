import { getAuthSession } from '@/lib/auth'
import { getToken } from 'next-auth/jwt'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const middleware = async () => {
  const session = await getAuthSession()

  if (!session || !session.user) throw new Error('Unauthorized')

  return { id: session.user.id }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '2MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => { }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter