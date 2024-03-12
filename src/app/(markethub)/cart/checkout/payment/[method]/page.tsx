'use client'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { Cart } from '@/lib/types';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

function page({
  params
}: {
  params: {
    method: string;
  };
}) {
  const { getItem } = useLocalStorage('value');
  const [item, setItem] = useState<Cart[]>([]);
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

  console.log(item)
  console.log(params.method)
  const renderedCommunityNames = new Set<string>();

  const calculateTotalAmount = (communityName: string) => {
    return (
      item
        ?.filter((cartItem) => cartItem.community.name === communityName)
        .reduce((total, cartItem) => total + cartItem.variant.price, 0) || 0
    );
  };
  const handleGoBack = () => {
    router.back(); 
  };
  const handlePlaceOrder = async () => {
    setisProcessing(true);
    try {
      const response = await fetch("/api/markethub/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Items: item, paymentMehthod: params.method }),
      });
  
      if (response.ok) {
        // If the response is successful, you can handle the success here
        router.replace("/cart/checkout/success");
  
        setCartNumber((prevCartNumber) => prevCartNumber - item.length);
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };


  return (
    <div className="w-full md:text-xl font-semibold px-10 mt-5">
      <button onClick={handleGoBack} type='button' className=''>
            <FaArrowLeft/>
          </button>
       <h1 className='text-center mb-10'>Scan the QR code to pay!</h1>
      <div className="w-full md:text-xl flex flex-wrap gap-10 md:gap-52 border justify-center items-center">
       
        {!loading && item &&
          item.map((cartItem: Cart) => {
            const communityName = cartItem.community.name;
            
            // Check if the community name has already been rendered
            if (!renderedCommunityNames.has(communityName)) {
              renderedCommunityNames.add(communityName);

              const totalAmount = calculateTotalAmount(communityName);
              if(cartItem.community.qrCode === null){
              return (<div>
                <h1>GCach payment for Community {cartItem.community.name} is not Available right now!</h1>
              </div>)
            }


              return (
                <div key={cartItem.id} className="bg-gray-200 md:p-10 shadow-md drop-shadow-md p-5">
                  <div className="w-full bg-white text-center">
                    <Image
                      src={cartItem.community.qrCode}
                      width={100}
                      height={100}
                      alt={`Qr code for ${communityName}`}
                      className='w w-56 h-56 mx-auto'
                    />
                    <h1 className="font-semibold text-center md:text-3xl">{communityName}</h1>
                  </div>
                  <div className='text-xl mt-10'>
                    <h1>Total amount to be paid: <span className='font-semibold text-green text-2xl'>₱ {totalAmount}</span></h1>
                  </div>
                </div>
              );
            }

            // Return null for items with already rendered community names
            return null;
          })}
      </div>
      <div className='w-full mt-10 text-center'>
        <Button 
         
          className='bg-yellow-300 w-1/3 h-12 text-black hover:text-white' 
          onClick={handlePlaceOrder}
          disabled={isProcessing ? true: false}
        >
          Done
        </Button>
      </div>
    </div>
  );
}

export default page;