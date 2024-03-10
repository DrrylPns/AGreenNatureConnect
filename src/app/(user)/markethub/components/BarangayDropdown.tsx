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
      <div className='relative w-full'>
        <Menu.Button className="relative flex ui-open:shadow-xl items-center justify-between w-full md:w-1/2 m-h-fit px-5 py-3 bg-white dark:bg-[#242526] drop-shadow-sm shadow-md border border-gray-300 rounded-md">
          Barangay <span><BiCaretDown/></span>
        </Menu.Button>
        
        <Menu.Items className='absolute flex flex-col bg-white dark:bg-[#242526] px-3 py-2 z-40 w-full md:w-1/2  min-h-fit border border-gray-300'>
            {communities.length > 0 && communities.map((community: Community) =>(
            <Menu.Item key={community.id} as={Fragment} >
                <Link 
                  className='hover:bg-pale py-2' 
                  href={{ pathname:`/markethub/community/${community.name}`, query:{communityId: community.id}} }>
                    {community.name}
                </Link>
            </Menu.Item>
            ))}
            
        </Menu.Items>
        </div>
    </Menu>

  )
}

export default BarangayDropdown