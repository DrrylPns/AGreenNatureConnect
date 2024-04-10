'use client'
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import axios from 'axios'
import { Community } from '@prisma/client'
import { BiCaretDown } from 'react-icons/bi'
import { Button } from '@/components/ui/button'
import banner from '../../../../../public/images/bannerbg.png'
import Image from 'next/image'
import Sharon from "@/../public/images/Sharon.png";
import SoloParent from "@/../public/images/SoloParent.png";
import Greenland from "@/../public/images/Greenland.png";


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
    <div className={`transition-all font-light md:tracking-wider bg-cover bg-center duration-500 ease-in w-full grid grid-cols-3 gap-5 md:grid-cols-6 justify-center border-2 border-gray-300 dark:border-gray-700 drop-shadow-md shadow-inner mt-3 p-2 sm:p-5`}>
      
      {communities.length > 0 && communities.map((community: Community) =>(
          <Link 
            className='relative border-2 border-gray-400 dark:border-gray-600 hover:scale-105 hover:shadow-lg md:h-32   md:w-32 sm:h-16 sm:w-16 flex flex-col justify-center text-[0.5rem] sm:text-sm md:text-xl  hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors ease-out duration-500 hover:font-bold items-center text-center bg-gray-50 dark:bg-[#1F2933] rounded-lg' 
            href={{ pathname:`/markethub/community/${community.name}`, query:{communityId: community.id}} }>
             
              
                {community.name === "Bagbag" && (
                  <>
                  <Image 
                    src={SoloParent} 
                    alt='' 
                    width={100}
                    height={100}
                    className='w-full h-full '
                  />
                  <h1 className='z-30 text-xs shadow-md font-semibold '>{community.name}</h1>
                  </>
                )}
                {community.name === "Nova Proper" && (
                  <>
                  <Image 
                    src={Sharon} 
                    alt='' 
                    width={100}
                    height={100}
                    className='w-full h-full'
                  />
                  <h1 className='z-30 text-xs shadow-md font-semibold '>{community.name}</h1>
                  </>
                )}
                {community.name === "Bagong Silangan" && (
                  <>
                  <Image 
                    src={Greenland} 
                    alt='' 
                    width={100}
                    height={100}
                    className='w-full h-full '
                  />
                  <h1 className='z-30 text-xs shadow-md font-semibold '>{community.name}</h1>
                  </>
                )}
                 
               
          </Link>
      
      ))}
    </div>
  )
}

export default BarangayDropdown