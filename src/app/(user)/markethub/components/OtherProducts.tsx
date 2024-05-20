'use client'
import React, { useEffect, useRef } from 'react'
import ProductModal from './ProductModal';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, ProductMarkethub, Variants } from '@/lib/types';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { useCart } from '@/contexts/CartContext';


type ProductProps = {
    getAllProducts: ProductMarkethub[];
    nextId: string;
};
function OtherProducts() {
    const pref = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView();
    const {barangay} = useCart()

    useEffect(() => {
        if (inView && hasNextPage) {
        fetchNextPage();
        }
    }, [inView]);

    const {
        isLoading,
        isError,
        data: Products,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["products",barangay],
        queryFn: async ({ pageParam = "" }) => {
        try {
            const { data } = await axios.get(`/api/markethub/products/others?cursor=${pageParam}&barangay=${barangay}`);
            return data as ProductProps;
        } catch (error: any) {
            throw new Error(`Error fetching post: ${error.message}`);
        }
        },
        getNextPageParam: (lastPage) => lastPage.nextId || undefined,
    });

    if (isLoading) return <div className=' w-full text-center'>Loading...</div>
    if (isError) return <div>Error!</div>;
    
    console.log(Products)
  return (
    <>
    {Products.pages.map((page)=>(
         <div key={page.nextId} className="grid grid-cols-2 sm:grid-cols-span-3 md:grid-cols-4 gap-5 border-x-[1px]  border-t-2 p-5 border-gray-300 font-poppins font-medium ">
            {page.getAllProducts !== undefined && page.getAllProducts.length > 0 ?
            page.getAllProducts.map((product)=>{
                    return (
                    <div key={product.id} className=''>
                        <ProductModal  product={product}/>
                    </div>
                    )
            }) : (
                <div className='flex col-span-2 sm:col-span-3 md:col-span-4 justify-center w-full h-1/2 text-center'>
                    <h1 className='text-2xl font-livvic font-semibold text-gray-500'>There are no available fruits right now!</h1>
                </div>
            )}
            {isFetchingNextPage && (
                <div className="transition-all text-center duration-500 ease-in-out animate-bounce">
                Loading...
                </div>
            )}
            <span ref={ref} className="invisible absolute">
                intersection observer marker
            </span>
        </div>
    ))}
   
    </>
  )
}

export default OtherProducts