'use client'
import { Product, Variants } from '@/lib/types'
import { Listbox, Transition } from '@headlessui/react'
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import PaginationSection from './PaginationSection'
import ProductModal from './ProductModal'
const Categories = [
    'All',
    'Fruits',
    'Vegetables',
    'Others',
]
function ProductsByCommunity({
    communityId
}:{
    communityId: string | undefined
}) {
    const [selectedCategory, setSelectedCategory] = useState<string>(Categories[0])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<Product[]>()
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = products?.slice(firstItemIndex, lastItemIndex)

    useEffect(()=>{
        setIsLoading(true)
        getPostByCategory()
      
       },[selectedCategory])

    const getPostByCategory = async () => {
    try {
        const res = (await axios.post(`/api/markethub/community/products?communityId=${communityId}`,{category:selectedCategory})).data;
        setProducts(res)
        setIsLoading(false)
    } catch (error) {
        console.log(error)
    }
    }
  return (
    <div className='full'>
        <div className='flex justify-between items-center'>
            <h1 className="text-xl font-bold text-center ">Products</h1>
            <div className='relative  flex items-center justify-around'>
                <h1 className="mr-5">Filter:</h1>
                <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <Listbox.Button className={'ring-1 ring-gray-400 relative w-28 p-2 text-sm rounded-md flex items-center justify-around bg-white shadow-md drop-shadow-md '}>{selectedCategory} <IoIosArrowDown /></Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute z-40 top-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg drop-shadow-md ring-2 ring-black/5 focus:outline-none sm:text-sm">
                        {Categories.map((category)=>(
                            <Listbox.Option
                            value={category}
                            className='relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-gray-100 text-gray-900'
                            >
                            {category}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
                </Listbox>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-span-3 md:grid-cols-4 gap-5 font-poppins font-medium mt-5 ">
            {isLoading ? (
                <>Loading...</>
            ):(
                <>
                {currentItems && currentItems?.length > 0 ? 
                    currentItems.map((product)=>{
                        const prices = product.variants.map((variant: Variants) => variant.price);
                        const lowestPrice = Math.min(...prices);
                        const highestPrice = Math.max(...prices);
                        if (product.variants.length < 1) {
                            return null
                        }
                        if (product.kilograms < 1 && product.grams < 1 && product.pounds < 1 && product.packs < 1 && product.pieces < 1) {
                            return null
                        } else {
                            return (
                            <div key={product.id} className=''>
                                <ProductModal  product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                            </div>
                            )
                        }
                }):(
                    <div className='flex col-span-2 sm:col-span-3 md:col-span-4 justify-center w-full h-1/2 text-center'>
                        <h1 className='text-2xl font-livvic font-semibold text-gray-500'>There are no available products right now!</h1>
                    </div>
                )}
                </>
            )}
           
        </div>
        <PaginationSection
            totalItems={products?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
    </div>
  )
}

export default ProductsByCommunity