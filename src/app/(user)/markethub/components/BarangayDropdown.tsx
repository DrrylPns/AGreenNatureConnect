'use client'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import axios from 'axios'
import { Community } from '@prisma/client'
import { BiCaretDown } from 'react-icons/bi'



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
    <Menu>
        <Menu.Button className="relative flex items-center justify-between w-full md:w-1/4 px-5 py-3 bg-white drop-shadow-sm shadow-md border-2 border-gray-400 rounded-md">Barangay <span><BiCaretDown/></span></Menu.Button>
        <Transition></Transition>
        <Menu.Items className='absolute flex flex-col bg-white px-3 py-2 z-40 w-[95%] md:w-1/4  min-h-fit border border-gray-300'>
            {communities.length > 0 && communities.map((community: Community) =>(
            <Menu.Item key={community.id} as={Fragment} >
                <Link 
                  className='hover:bg-slate-200 py-2' 
                  href={{ pathname:`/markethub/${community.name}`, query:{communityId: community.id}} }>
                    {community.name}
                </Link>
            </Menu.Item>
            ))}
            
        </Menu.Items>
    </Menu>

  )
}

export default BarangayDropdown