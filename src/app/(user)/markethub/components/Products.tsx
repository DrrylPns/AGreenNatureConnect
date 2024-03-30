import React from 'react'
import ProductModal from './ProductModal';

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

function Products({
    products,
    noProducts,
    selectedIndex
}:{
    products: Product[],
    noProducts: string,
    selectedIndex: number,
}) {
  return (
  <>
  {selectedIndex == selectedIndex && (
  <div className="grid grid-cols-12 border-x-[1px]  border-t-2 p-5 border-gray-300 font-poppins font-medium ">
    {products.length > 0 ? products.map((product) => {
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
        <div key={product.id} className='col-span-6 sm:col-span-4 md:col-span-3 lg:col-span-2'>
            <ProductModal product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
        </div>
        )
    }
    }) : (
    <div className='col-span-12 flex justify-center w-full h-1/2 text-center'>
        <h1 className='text-2xl font-livvic font-semibold text-gray-500'>{noProducts}</h1>
    </div>
    )}
  </div> 
  )}

</>  
)}

export default Products