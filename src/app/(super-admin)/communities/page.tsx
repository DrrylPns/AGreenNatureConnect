import { Card, Title } from '@tremor/react'
import SearchCommunities from '../_components/SearchCommunities'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { getUserById } from '../../../../data/user'

const CommunitiesPage = async () => {
    const session = await getAuthSession()

    const user = await getUserById(session?.user.id as string)

    if (!user) return <>Error fetching barangay admin</>

    const communities = await prisma.community.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            address: user.barangay,
            isArchived: false
        },
    })

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className='lg:w-[1280px] lg:ml-[300px]'>

                <Title>List of Urban Farms</Title>

                <SearchCommunities communities={communities} />

            </Card>
        </div>
    )
}

export default CommunitiesPage