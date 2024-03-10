'use client'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import axios from 'axios'
import { Community } from '@prisma/client'
import { BiCaretDown } from 'react-icons/bi'
import { Button } from '@/components/ui/button'



function BarangayDropdown() {
    const [communities, setCommunities] = useState<Community[]>([]);

    useEffect(()=>{
        fetchCommunities()
      },[])

    const fetchCommunities = async() =>{
        try {
          const response = await axios.get('/api/markethub/community')
          setCommunities(response.data)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <div className='transition-all duration-500 ease-in w-full grid grid-cols-6 border-2 border-gray-300 bg-gray-50 drop-shadow-md shadow-inner mt-3 p-5'>
      
      {communities.length > 0 && communities.map((community: Community) =>(
          <Link 
            className=' md:h-32 md:w-32 h-16 w-16 flex justify-center text-[0.6rem] md:text-xl hover:shadow-md scale-105 items-center text-center bg-white border-gray-200 border rounded-lg' 
            href={{ pathname:`/markethub/community/${community.name}`, query:{communityId: community.id}} }>
             
                {community.name}
          
          </Link>
      
      ))}
    </div>
  )
}

export default BarangayDropdown