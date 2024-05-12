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
            <Card className='w-full md:h-full h-[60%] md:ml-[5%] mt-[-65%] md:mt-[-20%] overflow-hidden shadow-lg bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4]'>
                <Title>List of Requests</Title>
                <SearchRequest 
                    request={requests} />
            </Card>
        </div>
    )
    
    
}

export default RequestPage