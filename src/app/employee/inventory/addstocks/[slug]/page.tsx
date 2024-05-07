import prisma from '@/lib/db/db'
import { getAuthSession } from '../../../../../lib/auth'
import { AddStocks } from './_components/AddStocks'

interface AddStocksProps {
    params: {
        slug: string
    }
}

const page = async ({ params }: AddStocksProps) => {

    const session = await getAuthSession()

    const user = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const community = await prisma.community.findFirst({
        where: {
            // userId: user?.id
            id: user?.Community?.id
        }
    })

    const product = await prisma.product.findFirst({
        where: {
            id: params.slug,
            communityId: community?.id
        },
        include: {
            
        }
    })

    return (
        <section className='flex flex-col justify-center p-12 md:max-w-2xl mx-auto gap-5'>
            <div className='text-xl border-b font-bold text-[#348d54]'>
                Add Stocks to {product?.name}
            </div>

            <AddStocks product={product} />
        </section>
    )
}

export default page