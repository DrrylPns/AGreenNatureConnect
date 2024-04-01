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
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/app/(markethub)/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { RatingStars } from './Rating';
import Link from 'next/link';

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
function ProductModal({
  product,
  lowestPrice,
  highestPrice,

}:{
  product: Product,
  lowestPrice: number,
  highestPrice: number
}) {
    const { cartNumber, setCartNumber} = useCart();
    const { data: session, status } = useSession()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const { setItem } = useLocalStorage('product')


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
        setIsLoading(true)
        const addToCart = await axios.post('/api/markethub/cart', {
          variantId: selectedVariant?.id, communityId: selectedProduct?.communityId
        }).then(res => {
          closeModal()
          setIsLoading(false)
          toast({
            description: "Added to cart, Successfuly!.",
          })
          setCartNumber((prevCartNumber) => prevCartNumber + 1);
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
    const handleLogin = () =>{
      closeModal()
      loginModal.onOpen()
    }

    const groupedVariants: { [key: string]: Variants[] } = {};
    selectedProduct?.variants.forEach((variant) => {
      const unitOfMeasurement = variant.unitOfMeasurement.toLowerCase();
      if (!groupedVariants[unitOfMeasurement]) {
        groupedVariants[unitOfMeasurement] = [];
      }
      groupedVariants[unitOfMeasurement].push(variant);
    });

    const handleBuyNow = async ()=>{
      router.push('/buy-now')
      setItem({selectedProduct, selectedVariant})
    }

    function productUnitOfMeasurementValue(variant: Variants){
      if (selectedProduct) {
        switch (variant.unitOfMeasurement.toLowerCase()) {
          case "kilograms":
        
            return (
              selectedProduct.kilograms);
          case "grams":
         
            return selectedProduct.grams;
          case "pounds":
       
            return selectedProduct.pounds;
          case "pieces":
      
            return selectedProduct.pieces;
          case "packs":
        
            return selectedProduct.packs;
          default:
            return 1000;// Default case, not disabled
        }
      }
      return 1000; // No selected product, not disabled
    }


    let sumOfRatings = 0;
    let totalNumberOfRatings = 0;
    selectedProduct && selectedProduct.reviews.length > 0 && selectedProduct.reviews.forEach(review => {
        sumOfRatings += review.overAllRating;
        totalNumberOfRatings++;
    });

    const ratingsAverage = selectedProduct && selectedProduct.reviews.length > 0 ? sumOfRatings / totalNumberOfRatings : 0
        
    
  return (
      <button
        type='button'
        onClick={() => openModal(product)}
        className='relative w-full z-10'
        disabled={product.kilograms === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? true : false}
      >
        <Card
          productId={product.id}
          imageUrl={product.productImage}
          productName={product.name}
          barangay={product.community?.name}
          lowestPrice={lowestPrice}
          highestPrice={highestPrice}
          productReviews={product.reviews}
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
                <Dialog.Panel className="w-full max-w-[40rem] max-h-fit transform overflow-hidden rounded-t-2xl text-black font-poppins bg-gray-50 text-left align-middle shadow-xl transition-all">
                  <div className='flex justify-end w-full '>
                    <button type='button' onClick={() => closeModal()} className='text-[1rem] md:px-5 p-3 '>
                      X
                    </button>
                  </div>
                  <div className=' md:flex justify-around items-center w-full '>
                    {selectedProduct?.productImage && (
                      <div className='w-full md:w-[15rem] max-h-[15rem] border-gray-300 border-2'>
                      <Image
                        src={selectedProduct.productImage}
                        alt='Product Image'
                        width={250}
                        height={250}
                        className="object-center w-full min-h-[15rem] max-h-[15rem]  sm:mx-0 "
                      />
                      </div>
                    )}
                    <div className='flex flex-col justify-start font-poppins'>
                      <div>
                        <h1 className='text-center font-livvic font-semibold text-3xl'>{selectedProduct?.name}</h1>
                        <h1 className='text-center  font-poppins text-sm'>
                          From 
                          <span className=' font-semibold'>
                          {selectedProduct?.community.name === "Bagbag" && " Solo Parent Urban Farm "}
                          {selectedProduct?.community.name === "Nova Proper" && " Sharon Urban Farm "}
                          {selectedProduct?.community.name === "Bagong Silangan" && " New Greenland Urban Farm "}
                          </span>  
                           Brgy.  
                          <span className=' font-semibold'> {selectedProduct?.community.name}</span>
                        </h1>
                      </div>
                      <span className='text-center font-livvic'>Available Stocks:(
                        {String(selectedProduct?.kilograms) === "0" ? "" : `${String(selectedProduct?.kilograms)}kg`}
                        {String(selectedProduct?.grams) === "0" ? "" : ` ${String(selectedProduct?.grams)}g`}
                        {String(selectedProduct?.pounds) === "0" ? "" : ` ${String(selectedProduct?.pounds)}lbs`}
                        {String(selectedProduct?.pieces) === "0" ? "" : ` ${String(selectedProduct?.pieces)}pcs`}
                        {String(selectedProduct?.packs) === "0" ? "" : ` ${String(selectedProduct?.packs)}packs`})
                      </span>
                      {selectedProduct && selectedProduct?.reviews.length > 0 ? (
                      <Link href={`/markethub/reviews/${product.id}`} className="flex z-30 items-center justify-center my-2 px-2 gap-5 w-full relative rounded-xl overflow-hidden dark:bg-slate-800/25">
                        <h1 className='text-sm  text-gray-600 dark:text-gray-300'>Ratings: {ratingsAverage.toFixed(1)} / 5.0</h1>
                        <h1 className="text-sm  text-gray-600 dark:text-gray-300">{selectedProduct?.reviews.length} Reviews</h1>
                      </Link>
                      ):(
                        <h1 className="text-sm text-center text-gray-600 dark:text-gray-300">{selectedProduct?.reviews.length} Reviews</h1>
                      )}
                     
                    </div>
                  </div>
                  <div className="mt-5 px-5">
                   
                    {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
                      <div className=''>
                        {Object.entries(groupedVariants).map(([unitOfMeasurement, variants]) => (
                          <div key={unitOfMeasurement}>
                            <h3 className="my-2 capitalize font-poppins font-medium">{unitOfMeasurement}</h3>
                            <div className='grid grid-cols-3'>
                              {variants.map((variant) => (
                                <div className='relative text-center'>
                                <button
                                  key={variant.id}
                                  onClick={() => { setSelectedVariant(variant) }}
                                  className={`${selectedVariant === variant ? 'bg-yellow-300' : 'bg-[#D9D9D9]'} text-black px-3 py-1 w-28 mx-3  transition-transform transform active:scale-95`}
                                  disabled={
                                    productUnitOfMeasurementValue(variant) < variant.variant}
                                >
                                  <div className='text-xs font-semibold'>{`${String(variant.variant)} ${unitOfMeasurement}`}</div>
                                  <div className='text-[0.6rem] font-semibold text-gray-600'>{`(Est. pc/s ${variant.EstimatedPieces})`} {productUnitOfMeasurementValue(variant)}</div>
                                </button>
                                {productUnitOfMeasurementValue(variant) < variant.variant && (
                              
                                    <h1 className='rounded-full text-xs tracking-wider text-red-600 font-medium font-poppins'>Out of stock</h1>
                                
                                )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='w-full bg-gray-100 border-gray-200 border-t-2 shadow-md drop-shadow-xl mt-10 py-5 px-5'>
                    <span className='text-right text-lg font-poppins text-black'>
                      Total Price:
                      <span className='font-semibold font-poppins text-lg'> ₱ {
                        selectedProduct?.isFree ? "Free" : selectedVariant?.price == undefined ? '0' : String(selectedVariant?.price)}
                      </span>
                    </span>
                  </div>
                  {status === 'authenticated' ? (
                    <div className="w-full ">
                      <Button
                        type="button"
                        className="w-1/2 bg-yellow-300 py-5 h-16 rounded-none outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={() => handleAddToCart()}
                        disabled={selectedVariant == null || isLoading}
                      >
                        {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
                      </Button>
                      <Button
                        type="button"
                        className="w-1/2 bg-green py-5 h-16  rounded-none outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={() => handleBuyNow()}
                        disabled={selectedVariant == null || isLoading }
                      >
                        {isLoading ? 'Processing...' : 'Buy Now'}
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full ">
                      <button
                        type="button"
                        className="w-full bg-yellow-600 py-5  outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={()=> handleLogin()}
                        disabled={selectedVariant == null ? true : false}
                      >
                        Add to Cart
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