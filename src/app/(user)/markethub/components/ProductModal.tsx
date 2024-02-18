'use client'
import { toast } from '@/lib/hooks/use-toast';
import useLoginModal from '@/lib/hooks/useLoginModal';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { Fragment, useState } from 'react'
import { z } from 'zod';
import Card from './Card';

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
function ProductModal({
  product,
  lowestPrice,
  highestPrice,

}:{
  product: Product,
  lowestPrice: number,
  highestPrice: number
}) {
    const { data: session, status } = useSession()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);

    const [isLoading, setIsLoading] = useState(false);


    function closeModal() {
        setIsOpen(false)
        setSelectedVariant(null)
        setSelectedProduct(null)
      }
    function openModal(product: Product) {
    setSelectedProduct(product);
    setIsOpen(true)
    }

    const handleAddToCart = async () => {
      try {
      
        const addToCart = await axios.post('/api/markethub/cart', {
          variantId: selectedVariant?.id, communityId: selectedProduct?.communityId
        }).then(res => {
          closeModal()
          toast({
            description: "Added to cart, Successfuly!.",
          })
  
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          toast({
            title: "Something went wrong",
            description: "Can't add to cart, please try again later",
            variant: "destructive",
          })
          console.error('Validation Error:', error.errors);
        } else {
          toast({
            title: "Something went wrong",
            description: "Can't add to cart, please try again later",
            variant: "destructive",
          })
          console.error('Error deleting cart item:', error);
        }
      } finally {
        setIsLoading(false)
      }
    }
    
  return (
      <button
        type='button'
        onClick={() => openModal(product)}
        className='relative w-full'
        disabled={product.kilograms === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? true : false}
      >
        <Card
          imageUrl={product.productImage}
          productName={product.name}
          barangay={product.community?.name}
          lowestPrice={lowestPrice}
          highestPrice={highestPrice}
        />
        {product.kilograms < 1 && product.grams < 1 && product.pounds < 1 && product.packs < 1 && product.pieces < 1 ? (
          <div className={`absolute top-5 left-5 rounded-full w-3/4 h-3/4 bg-semi-transparent-greenish flex justify-center items-center`}>
            <span className='text-lg font-poppins text-white font-semibold'>Sold out</span>
          </div>
        ) : (
          <div>

          </div>
        )}
         <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[50rem] max-h-fit transform overflow-hidden rounded-t-2xl text-white font-poppins bg-semi-transparent-greenish text-left align-middle shadow-xl transition-all">
                  <div className='flex justify-end w-full '>
                    <button type='button' onClick={() => closeModal()} className='text-white text-[1rem] md:px-5 p-3 '>
                      X
                    </button>
                  </div>
                  <div className=' md:flex gap-10 mx-6 '>
                    {selectedProduct?.productImage && (
                      <Image
                        src={selectedProduct.productImage}
                        alt='Product Image'
                        width={300}
                        height={300}
                        className="w-full md:w-1/2 h-40"
                        loading='eager'
                      />
                    )}
                    <div className='flex flex-col font-poppins text text mx-auto'>
                      <div>
                        <h1 className='text-center font-livvic font-bold text-[2.5rem]'>{selectedProduct?.name}</h1>
                        <h1 className='text-center text-pale-white font-poppins text-sm'>from barangay <span className=' font-semibold'>{selectedProduct?.community.name}</span></h1>
                      </div>
                      <span>Available Stocks:(
                        {String(selectedProduct?.kilograms) === "0" ? "" : `${String(selectedProduct?.kilograms)}kg`}
                        {String(selectedProduct?.grams) === "0" ? "" : `/${String(selectedProduct?.grams)}g`}
                        {String(selectedProduct?.pounds) === "0" ? "" : `/${String(selectedProduct?.pounds)}lbs`}
                        {String(selectedProduct?.pieces) === "0" ? "" : `/${String(selectedProduct?.pieces)}pcs`}
                        {String(selectedProduct?.packs) === "0" ? "" : `/${String(selectedProduct?.packs)}packs`})
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 px-5">
                    <h2 className='mb-5'>Select variant</h2>
                    {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
                      <div className=''>
                        {selectedProduct.variants.map((variant: Variants) => {
                          const unitOfMeasurement = variant.unitOfMeasurement.toLowerCase();
                          const isValidVariant =
                            unitOfMeasurement === 'kilograms' && selectedProduct.kilograms >= variant.variant ||
                            unitOfMeasurement === 'grams' && selectedProduct.grams >= variant.variant ||
                            unitOfMeasurement === 'pieces' && selectedProduct.pieces >= variant.variant ||
                            unitOfMeasurement === 'pounds' && selectedProduct.pounds >= variant.variant ||
                            unitOfMeasurement === 'packs' && selectedProduct.packs >= variant.variant;

                          return isValidVariant ? (
                            <button
                              type='button'
                              key={variant.id}
                              onClick={() => { setSelectedVariant(variant) }}
                              className={`${selectedVariant === variant ? 'bg-yellow-300' : 'bg-[#D9D9D9]'} text-black px-5 py-2 w-32 mx-3 mt-3 transition-transform transform active:scale-95`}
                            >
                              <div className='text-sm font-semibold'>{`${String(variant.variant)} ${unitOfMeasurement}`}</div>
                              <div className='text-xs font-semibold text-gray-600'>{`(Est. pc/s ${variant.EstimatedPieces})`}</div>
                            </button>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                  <div className='w-full bg-white shadow-md drop-shadow-xl mt-36 py-5 px-5'>
                    <span className='text-right text-lg font-poppins text-black'>
                      Total Price:
                      <span className='font-semibold font-poppins text-lg'> ₱ {
                        selectedProduct?.isFree ? "Free" : selectedVariant?.price == undefined ? '0' : String(selectedVariant?.price)}
                      </span>
                    </span>
                  </div>
                  {status === 'authenticated' ? (
                    <div className="w-full ">
                      <button
                        type="button"
                        className="w-1/2 bg-[#FDE63F] py-5"
                        onClick={() => handleAddToCart()}
                        disabled={selectedVariant == null || isLoading}
                      >
                        {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
                      </button>
                      <button
                        type="button"
                        className="w-1/2 bg-[#24643B] py-5"
                        onClick={closeModal}
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <div className="w-full ">
                      <button
                        type="button"
                        className="w-1/2 bg-[#FDE63F] py-5 outline outline-gray-500 hover:outline-1"
                        onClick={loginModal.onOpen}
                        disabled={selectedVariant == null ? true : false}
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        className="w-1/2 bg-[#24643B] py-5 hover:bg-white/40"
                        onClick={loginModal.onOpen}
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </button> 
  )
}

export default ProductModal