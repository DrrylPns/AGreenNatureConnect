'use client'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import ProductModal from './ProductModal'

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
    vegetables,
    fruits
}:{
    vegetables: Product[],
    fruits: Product[]
}) {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <div>
        <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List>
                <Tab className="flex justify-center items-center min-w-fit text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                    <h1>Fruits</h1>
                </Tab>
                <Tab className="flex justify-center items-center min-w-fit text-xs md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                    <h1>Vegetables</h1>
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <div className="grid grid-cols-2 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-x-[1px] min-h-screen border-t-2 p-5 border-gray-300 gap-4 font-poppins font-medium ">
                        {fruits.length > 0 ? fruits.map((product) => {
                        const prices = product.variants.map((variant) => variant.price);
                        const lowestPrice = Math.min(...prices);
                        const highestPrice = Math.max(...prices);
                        if (product.variants.length < 1) {
                            return null
                        }

                        if (product.kilograms < 1 && product.grams < 1 && product.pounds < 1 && product.packs < 1 && product.pieces < 1) {
                            return null
                        } else {
                            return (
                            <ProductModal product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                            )
                        }
                        }) : (
                        <div className='flex justify-center'>
                            <h1 className='text-2xl font-livvic font-medium'>There is no available fruits right now!</h1>
                        </div>
                        )}
                    </div> 
                </Tab.Panel>
                <Tab.Panel>
                <div className="grid grid-cols-2 items-start sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-x-[1px] min-h-screen border-t-2 p-5 border-gray-300 gap-4 font-poppins font-medium ">
                        {vegetables.length > 0 ? vegetables.map((product) => {
                        const prices = product.variants.map((variant) => variant.price);
                        const lowestPrice = Math.min(...prices);
                        const highestPrice = Math.max(...prices);
                        if (product.variants.length < 1) {
                            return null
                        }

                        if (product.kilograms === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0) {
                            return null
                        } else {
                            return (
                            <ProductModal product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                            )
                        }
                        }) : (
                        <div className='flex justify-center'>
                            <h1 className='text-2xl font-livvic font-medium'>There is no available vegetables right now!</h1>
                        </div>
                        )}
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default ProductTab