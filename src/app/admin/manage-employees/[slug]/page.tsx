
import React from 'react'
import prisma from '@/lib/db/db'
import { getAuthSession } from '../../../../lib/auth'
import { EditEmployee } from './_components/edit-employee'

interface InventoryUpdateProps {
    params: {
        slug: string
    }
}

const page = async ({ params }: InventoryUpdateProps) => {
    const session = await getAuthSession()

    // const community = await prisma.community.findFirst({
    //     where: {
    //         userId: session?.user.id
    //     },
    //     include: {
    //         user: true,
    //         products: true,
    //         blogs: true,
    //         articles: true,
    //     }
    // })

    const loggedInUser = await prisma.user.findFirst({
        where: {
            id: session?.user.id
        },
        include: {
            Community: true
        }
    })

    const employee = await prisma.user.findFirst({
        where: {
            id: params.slug,
            role: 'EMPLOYEE',
            Community: {
                name: loggedInUser?.Community?.name
            }
        },
        include: {
            Community: true
        }
    })

    // console.log(employees)

    return (
        <div className='w-full flex flex-col justify-center items-center h-[80vh]'>
            {/* <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Update Employee</h1>
                <p className='text-muted-foreground'>Note: You are about to update this employee in your respected community.</p>
            </div> */}

            <EditEmployee employee={employee} />
        </div>
    )
}

export default page