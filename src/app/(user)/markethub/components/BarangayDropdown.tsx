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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/Ui/select'
import { useCart } from '@/contexts/CartContext'


function BarangayDropdown() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [address, setAddress] = useState<Community[]>([]);
    const [filter, setFilter] = useState<string>('')
    const {setBarangay} = useCart()

    useEffect(()=>{
        fetchCommunities()
        fetchAddress()
        setBarangay(filter)
      },[filter])

    const fetchCommunities = async() =>{
        try {
          const response = await axios.post('/api/markethub/community',{filter})
          setCommunities(response.data)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
    }
    const fetchAddress = async() =>{
        try {
          const response = await axios.get('/api/markethub/community')
          setAddress(response.data)

        } catch (error) {
          console.log(error)
        }
    }
    const handleChange  = (newValue: string)=>{
      setFilter(newValue);
    }
    const filterCommunitiesByAddress = (communities: Community[]) => {
      const uniqueAddresses = new Set<string>();
      return communities.filter((community) => {
        if (uniqueAddresses.has(community.address)) {
          return false; // Exclude if address is already in the set
        }
        uniqueAddresses.add(community.address);
        return true; // Include if address is unique
      });
    };
    const filteredCommunities = filterCommunitiesByAddress(address);
  return (
    <>
    <div className='flex justify-between items-center w-full'>
      <h1 className="text-sm md:text-xl font-bold mt-3 dark:text-white">Urban Farms:</h1>
      <Select onValueChange={handleChange} defaultValue={filter} >
        <SelectTrigger className="w-[180px] border-2 shadow-md">
          <SelectValue placeholder="Barangay" />
        </SelectTrigger>
        <SelectContent> 
          <SelectItem value={'all'}>Show all</SelectItem>       
          {filteredCommunities.map((community: Community) => (
            <SelectItem key={community.id} value={community.address}>
              {community.address}
            </SelectItem>
          ))} 
        </SelectContent>
      </Select>
    </div>
    <div className={`transition-all font-light md:tracking-wider bg-cover bg-center duration-500 ease-in w-full grid grid-cols-3 gap-5 md:grid-cols-6 justify-center border-2 border-gray-300 dark:border-gray-700 drop-shadow-md shadow-inner mt-3 p-2 sm:p-5`}>
    
      {communities.length > 0 && communities.map((community: Community) =>(
          <Link  key={community.id}
            className='relative border-2 border-gray-400 dark:border-gray-600 hover:scale-105 hover:shadow-lg md:h-32   md:w-32 sm:h-16 sm:w-16 flex flex-col justify-center text-[0.5rem] sm:text-sm md:text-xl  hover:text-yellow-300 dark:hover:text-yellow-300 transition-colors ease-out duration-500 hover:font-bold items-center text-center bg-gray-50 dark:bg-[#1F2933] rounded-lg' 
            href={{ pathname:`/markethub/community/${community.name}`, query:{communityId: community.id}} }>
                  {/* <Image 
                    src={community.displayPhoto || ""} 
                    alt={community.name || "Urban Farm Name"} 
                    width={100}
                    height={100}
                    className='w-full h-full '
                  /> */}
                  <h1 className='z-30 text-xs shadow-md font-semibold '>{community.name}</h1>       
          </Link>
      ))}
    </div>
    </>
  )
}

export default BarangayDropdown