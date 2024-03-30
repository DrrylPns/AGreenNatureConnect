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
import Bagbag from '../images/BagbagImage1.jpg'
import Nova from '../images/NovaProper1.jpg'
import Silangan from '../images/BagongSilangan1.jpg'


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
    <div className={`transition-all font-light md:tracking-wider bg-cover bg-center duration-500 ease-in w-full grid grid-cols-6 justify-center border-2 border-gray-300 drop-shadow-md shadow-inner mt-3 p-2 sm:p-5`}>
      
      {communities.length > 0 && communities.map((community: Community) =>(
          <Link 
            className='relative border-2 border-gray-400 hover:scale-105 hover:shadow-lg md:h-32 w-10 h-10  md:w-32 sm:h-16 sm:w-16 flex justify-center text-[0.5rem] sm:text-sm md:text-xl  hover:text-yellow-300 transition-colors ease-out duration-500 hover:font-bold items-center text-center bg-gray-50 rounded-lg' 
            href={{ pathname:`/markethub/community/${community.name}`, query:{communityId: community.id}} }>
             
                <h1 className='z-30 shadow-md font-semibold text-yellow-300'>{community.name}</h1>
                {community.name === "Bagbag" && (
                  <Image 
                    src={Bagbag} 
                    alt='' 
                    width={100}
                    height={100}
                    className='absolute top-0 w-full h-full '
                  />
                )}
                {community.name === "Nova Proper" && (
                  <Image 
                    src={Nova} 
                    alt='' 
                    width={100}
                    height={100}
                    className='absolute top-0 w-full h-full '
                  />
                )}
                {community.name === "Bagong Silangan" && (
                  <Image 
                    src={Silangan} 
                    alt='' 
                    width={100}
                    height={100}
                    className='absolute top-0 w-full h-full '
                  />
                )}
               
          </Link>
      
      ))}
    </div>
  )
}

export default BarangayDropdown