'use client'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import AllProducts from './AllProducts';
import Fruits from './Fruits';
import Vegetables from './Vegetables';
import OtherProducts from './OtherProducts';

interface Product {
    id: string;
    itemNumber: number | null;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    variants: Variants[]
    category: string;
    status: string;
    isFree: boolean;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
    community: Community;
    communityId: string;
    reviews: Reviews[]
  }
  interface Reviews {
    id:     string
    image: string | null
    priceRating:  number
    qualityRating:  number
    serviceRating:  number
    freshnessRating: number
    overAllRating:  number
    title: string
    description: string | null
    createdAt: Date         
    updatedAt: Date           
    productId: string
    userId: string
  }
  interface Community {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  
  }
  interface Variants {
    id: string
    unitOfMeasurement: string;
    variant: number;
    price: number;
    EstimatedPieces: number;
    createdAt: Date;
    updatedAt: Date;
  }

function ProductTab({
 
}:{
   
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div className='pb-10'>
        <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className={'w-full flex-row dark:bg-[#1F2933] dark:text-white'}>
                <Tab className="w-1/4 border-x-2 border-t-2 border-x-slate-300 dark:border-x-zinc-700 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>All</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 dark:border-x-zinc-700 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Fruits</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 dark:border-x-zinc-700 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Vegetables</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 dark:border-x-zinc-700 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Others</h1>
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <AllProducts/>
                </Tab.Panel>
                <Tab.Panel>
                    <Fruits/>
                </Tab.Panel>
                <Tab.Panel>
                    <Vegetables/>
                </Tab.Panel>
                <Tab.Panel>
                   <OtherProducts/>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default ProductTab