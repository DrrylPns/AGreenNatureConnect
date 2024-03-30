'use client'
import React, { useEffect, useRef } from 'react'
import ProductModal from './ProductModal';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, Variants } from '@/lib/types';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';


type ProductProps = {
    getAllProducts: Product[];
    nextId: string;
};
function Fruits() {
    const pref = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView();

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
        queryKey: ["products"],
        queryFn: async ({ pageParam = "" }) => {
        try {
            const { data } = await axios.get(`/api/markethub/products/fruits?cursor=${pageParam}`);
            return data as ProductProps;
        } catch (error: any) {
            throw new Error(`Error fetching post: ${error.message}`);
        }
        },
        getNextPageParam: (lastPage) => lastPage.nextId || undefined,
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!</div>;
    
    console.log(Products)
  return (
    <>
    {Products.pages.map((page)=>(
        <div key={page.nextId} className="grid grid-cols-12 border-x-[1px]  border-t-2 p-5 border-gray-300 font-poppins font-medium ">
            {page.getAllProducts !== undefined && page.getAllProducts.length > 0 ?
            page.getAllProducts.map((product)=>{
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
                        <div key={product.id} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'>
                            <ProductModal  product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                        </div>
                        )
                    }
            }) : (
                <div className='col-span-12 flex justify-center w-full h-1/2 text-center'>
                    <h1 className='text-2xl font-livvic font-semibold text-gray-500'>There are no available fruits right now!</h1>
                </div>
            )}

        </div>
    ))}
   
    </>
  )
}

export default Fruits