import { Card, Title } from '@tremor/react'
import SearchCommunities from '../_components/SearchCommunities'
import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { getUserById } from '../../../../data/user'
import SearchRequest from '../_components/SearchRequest'

const RequestPage = async () => {
    const session = await getAuthSession()

    const user = await getUserById(session?.user.id as string)

    if (!user) return <>Error fetching barangay admin</>

    const requests = await prisma.urbanFarmApplicatants.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            address: user.barangay || '',
        },
    })

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className='lg:w-[1280px] lg:ml-[300px]'>

                <Title>List of Requests</Title>
        
                <SearchRequest 
                    request={requests} />
            </Card>
        </div>
    )
}

export default RequestPage