import { getAuthSession } from '@/lib/auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

const middleware = async () => {
  const session = await getAuthSession()

  if (!session || !session.user) throw new Error('Unauthorized')

  return { id: session.user.id }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(async ({ metadata, file }) => { }),
  changeAvatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(middleware)
    .onUploadComplete(async (data) => { }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter