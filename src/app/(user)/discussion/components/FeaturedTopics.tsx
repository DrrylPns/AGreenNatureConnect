'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DisplayPhoto1 from '../images/displayphoto3.png'
import { MdOutlineTopic } from 'react-icons/md'
import prisma from '@/lib/db/db'
import { Topic } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import FeaturedTopicsSkeleton from './Skeleton/FeaturedTopic'

export default function FeaturedTopics() {

    const [topics, setTopics] = useState<Topic[]>([])

    useEffect(() => {
        getTopics()
    }, [])

    const getTopics = async () => {
        try {
            const response = await axios.get('/api/user/topic')
            const data = response.data
            setTopics(data)
        } catch (error) {

        }

    }
    const featuredTopics = topics.slice(0, 5)
    return (
        <section className='hidden fixed top-24 left-[77%] h-full w-[21%] lg:block '>

            <div className=' rounded-xl p-3 shadow-lg drop-shadow-lg h-56 min-h-fit'>
                <h3 className='font-poppins font-semibold mb-3 leading-10 pb-1 border-b border-gray-200'>Featured Topic</h3>
                {/**Post from the community, display maximum of 2*/}
                {topics.length < 1 && (
                    <div className='w-full flex'>
                        <FeaturedTopicsSkeleton />
                    </div>
                )}
                {featuredTopics.map(topic => (
                    <Link href={`discussion/${topic.name}`} >
                        <div className='flex items-center gap-3' >

                            <MdOutlineTopic />
                            <div className='w-full'>
                                <h3 className='text-base font-normal'>{topic.name}</h3>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    )
}
