import { Card, Title } from '@tremor/react'
import React from 'react'
import SearchCommunities from '../_components/SearchCommunities'
import prisma from '@/lib/db/db'

const ArchivedCommunitiesPage = async () => {
    const communities = await prisma.community.findMany({
        orderBy: {
            createdAt: "desc"
        },
        where: {
            isArchived: true
        },
    })
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className='lg:w-[1280px] lg:ml-[300px]'>

                <Title>List of Archived Communities</Title>

                <SearchCommunities
                    communities={communities}
                    isArchivePanel
                />

            </Card>
        </div>
    )
}

export default ArchivedCommunitiesPage