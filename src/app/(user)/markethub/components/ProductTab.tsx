'use client'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import ProductModal from './ProductModal'
import Products from './Products'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import RotatingLinesLoading from '@/app/(markethub)/components/RotatingLinesLoading'


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
    allProducts,
    fruits,
    vegetables,
    others,
    isLoading,
    isFetching,
}:{
    allProducts: Product[],
    fruits: Product[],
    vegetables: Product[],
    others: Product[],
    isLoading: boolean,
    isFetching: boolean
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    

    return (
    <div className='pb-10'>
        <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className={'w-full flex-row bg-gray-100 dark:text-black'}>
                <Tab className="w-1/4 border-x-2 border-t-2 border-x-slate-300 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>All</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Fruits</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Vegetables</h1>
                </Tab>
                <Tab className="w-1/4 border-r-2 border-t-2 border-r-slate-300 text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-500 py-2 px-4">
                    <h1>Others</h1>
                </Tab>
            </Tab.List>
            {!isFetching ? (
            <Tab.Panels>
                <Tab.Panel>
                    {!isLoading ? (
                        <Products products={allProducts} noProducts='There are no available products right now!' selectedIndex={selectedIndex}/>
                    ):(
                        <div>
                            <RotatingLinesLoading/>
                        </div>
                    )}
                    
                </Tab.Panel>
                <Tab.Panel>
                    {!isLoading ? (
                        <Products products={fruits} noProducts='There are no available fruits right now!' selectedIndex={selectedIndex}/>
                    ):(
                        <div>
                            <RotatingLinesLoading/>
                        </div>
                    )}
                    
                </Tab.Panel>
                <Tab.Panel>
                    {!isLoading ? (
                        <Products products={vegetables} noProducts='There are no available vegetables right now!' selectedIndex={selectedIndex}/>
                    ):(
                        <div>
                            <RotatingLinesLoading/>
                        </div>
                    )}
                    
                </Tab.Panel>
                <Tab.Panel>
                    {!isLoading ? (
                        <Products products={others} noProducts='There are no available other products right now!' selectedIndex={selectedIndex}/>
                    ):(
                        <div>
                            <RotatingLinesLoading/>
                        </div>
                    )}
                    
                </Tab.Panel>
            </Tab.Panels>
            ):(
                <div>
                    <RotatingLinesLoading/>
                </div>
            )}
        </Tab.Group>
    </div>
  )
}

export default ProductTab