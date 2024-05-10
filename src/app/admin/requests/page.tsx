import { Card, Title } from '@tremor/react'

import prisma from '@/lib/db/db'
import { getAuthSession } from '@/lib/auth'
import { getUserById } from '../../../../data/user'
import SearchRequest from '../_components/SearchRequest'


const RequestPage = async () => {
    const session = await getAuthSession()

    const user = await getUserById(session?.user.id as string)

    if (!user) return <>Error fetching barangay admin</>

    const requests = await prisma.consignorApplicants.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            urbanFarm:{
                id: user.communityId || ""
            }
        },
        include:{
            urbanFarm: true,
            user: true
        }
    })

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className='lg:w-[1280px] lg:mt-[-20%]'>

                <Title>List of Requests</Title>
        
                <SearchRequest 
                    request={requests} />
            </Card>
        </div>
    )
}

export default RequestPage