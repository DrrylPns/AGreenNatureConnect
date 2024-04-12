'use client'
import React, { useEffect, useState } from 'react'

import { Cart, Product, Variants } from '@/lib/types';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLocalStorage } from '@/app/(markethub)/hooks/useLocalStorage';

type buyNowType = {
  selectedProduct: Product,
  selectedVariant: Variants
}

function page({
  params
}: {
  params: {
    method: string;
  };
}) {
  const { getItem } = useLocalStorage('product');
  const [item, setItem] = useState<buyNowType>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [isProcessing, setisProcessing] = useState<boolean>(false);
  const { cartNumber, setCartNumber } = useCart();

  useEffect(() => {
    setItem(getItem());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  const handleGoBack = () => {
    router.back(); 
  };
 
  return (
    <div className="w-full md:text-xl font-semibold px-10 mt-5">
      <button onClick={handleGoBack} type='button' className=''>
            <FaArrowLeft/>
          </button>
       <h1 className='text-center mb-10'>Scan the QR code to pay!</h1>
      <div className="w-full md:text-xl flex flex-wrap gap-10 md:gap-52 border justify-center items-center">
       
        {!loading && item && (
          <>
            {item.selectedProduct.community.qrCode === null ? (
              <h1>GCach payment for Community {item.selectedProduct.community.name} is not Available right now!</h1>
            ):(
              <div className="bg-gray-200 md:p-10 shadow-md drop-shadow-md p-5">
                <div className="w-full bg-white text-center">
                  <Image
                    src={item.selectedProduct.community.qrCode}
                    width={100}
                    height={100}
                    alt={`Qr code for ${item.selectedProduct.community.name}`}
                    className='w w-56 h-56 mx-auto'
                  />
                  <h1 className="font-semibold text-center md:text-3xl">{item.selectedProduct.community.name}</h1>
                </div>
              <div className='text-xl mt-10'>
                <h1>Total amount to be paid: <span className='font-semibold text-green text-2xl'>₱ {item.selectedProduct.isFree ? 0 : item.selectedVariant.price}</span></h1>
              </div>
            </div>
            )}
          </>
        )}           
      </div>
      <div className='w-full mt-10 text-center'>
        <Button 
          className='bg-yellow-300 w-1/3 h-12 text-black hover:text-white' 
          onClick={()=> router.push('/order-status')}
          disabled={isProcessing ? true: false}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default page;