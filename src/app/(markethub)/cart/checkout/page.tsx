'use client'
import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Cart, ShippingInfo } from '@/lib/types';
import Image from 'next/image';
import { RotatingLines } from 'react-loader-spinner';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

function page() {
    const [checkoutItems, setCheckoutItems ] = useState<Cart[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>();
    const { getItem } = useLocalStorage("value");
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        setItems()
        fetchShippingInfo()
        setTimeout(() => {
            setLoading(false); 
        }, 2000); 
    },[])

    const setItems = () => {
        setCheckoutItems(getItem);
    };

    //get Shipping info from db
    const fetchShippingInfo = async () => {
        try {
          const response = await axios.get('/api/markethub/shippingInfo');
          setShippingInfo(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      //Close the modal
    function closeModal() {
        setIsOpen(false)
    }
    //Open the modal
    function openModal() {
        setIsOpen(true)
    }
    // Function to group items by community name
    const groupItemsByCommunity = () => {
    const groupedItems: Record<string, Cart[]> = {};

    checkoutItems.forEach((item: Cart) => {
        const communityName = item.variant.product.community.name;
        if (!groupedItems[communityName]) {
        groupedItems[communityName] = [];
        }
        groupedItems[communityName].push(item);
    });

    return groupedItems;
    };

    const groupedItems = groupItemsByCommunity();

    // Calculate total price for each barangay and get the sum of total prices
    const calculateSubtotal = (items: Cart[]) => {
        return items.reduce((total, item) => total + item.variant.price, 0);
    };

    const subtotalByBarangay: Record<string, number> = {};
    Object.entries(groupedItems).forEach(([communityName, communityItems]) => {
        subtotalByBarangay[communityName] = calculateSubtotal(communityItems);
    });

    // Get the sum of total prices for all barangays
    const totalSum = Object.values(subtotalByBarangay).reduce((sum, subtotal) => sum + subtotal, 0);

    //Arrow back fuction
    const handleGoBack = () => {
        router.back(); 
      };


    const handleAddShippingInfo = () =>{
        router.push('/checkout')
    };
    const handlePlaceOrder = async() =>{
        await axios.post('/api/markethub/transaction', {Items: checkoutItems})
        .then(res =>{
          router.push('/cart/checkout/success')
        })
    }

  return (
    <div>
        <div className='relative pl-5 w-full'>
            <div className='absolute top-3'>
            <button onClick={handleGoBack} >
                <FaArrowLeft/>
            </button>
            </div>
            <h1 className='font-bold text-[2rem] text-center'>Checkout</h1>
        </div>
        {shippingInfo == null ? (
        <div  className='flex justify-center items-center w-full'>
            <div className='flex flex-col items-center justify-center text-sm md:text-md lg:text-lg mb-5'>
                <p className='text-gray-400 text-center'>If you intend to ship your order using courier(ex. lalamove, grab, etc.) and for faster transaction.</p>
                <button onClick={handleAddShippingInfo} className='' >
                    <div className='text-2xl text-yellow-400 flex items-center'>
                        <IoIosAddCircleOutline/>
                        <span>Add shipping information</span>
                    </div>
                </button>
            </div>
        </div>
        ):(
        <div className='flex bg-muted-green min-w-full px-5 md:px-10 py-5 text-white'>
            <div className="text-4xl text-red-600">
                <FaLocationDot/>
            </div>
            <div className='ml-10 text-sm md:text-md lg:text-lg'>
                <h3>Full Name:</h3>
                <h3 className='text text-wrap'>Address: asdasdasdsadsadasdasdasdasdasdas asdasdas dasd asd asdasd asd</h3>
                <h3>Email:</h3>
                <h3>Contact Number:</h3>
                <h3>Facebook:</h3>
            </div>
            <div className='flex justify-center items-center ml-auto'>
                <button onClick={()=>{}} className='bg-yellow-400 rounded-xl px-10 py-2 text-xl font-poppins font-medium text-black'>
                    Edit
                </button>
            </div>
        </div>
        )}
        
        {loading != true ? (
            <>
            <div className='px-3 pb-32 md:px-[20%]'>
                {Object.entries(groupedItems).map(([communityName, communityItems]) => (
                <div key={communityName} className='mb-5 pb-2 bg-gray-50 shadow-sm drop-shadow-md'>
                    <div className='flex items-center gap-20 border-y-2 bg-gray-100 border-gray-300 py-2 px-10'>
                        <h2 id={`selectAll_${communityName}`} className='text-[1rem] font-poppins font-bold'>
                            Barangay {communityName}
                        </h2>   
                    </div>
                    {communityItems.map((item: Cart) => (
                    <div key={item.id} className='flex gap-5 justify-between pb-2 items-center border-b-2 border-b-gray-300 mx-10 md:mx-[25%] mt-5'>
                        <Image 
                        src={item.variant.product.productImage}
                        alt={item.variant.product.name}
                        height={100}
                        width={100}
                        />
                        <div>
                        <h3>{item.variant.product.name}</h3>
                        <h3>{item.variant.variant} <span>{item.variant.unitOfMeasurement}</span></h3>
                        </div>
                        <div className='ml-auto'>
                        <h3>P {item.variant.price}</h3>
                        </div>
                    </div>
                    ))}
                    <div className='p-5 font-semibold text-md md:text-lg'>
                        <h1 className=''>Order Total: <span>P {subtotalByBarangay[communityName]}</span></h1>
                    </div>
                </div>
                ))}
            </div>
            </>
        ):(
            <div className="text-center flex justify-center">
                <RotatingLines
                    strokeColor="green"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="20"
                    visible={true}
                />
            </div>
        )}
        {/* Display the subtotal based on selected items */}
        <div className='fixed bottom-0 w-full flex'>
        <div className='w-1/2 flex justify-center items-center bg-green py-5 text-[1rem] text-white text-4xl font-semibold fon font-poppins'>
            <h1 className='text-center'>Sub Total:<span className='text-2xl font-bold ml-10'>₱ {totalSum.toFixed(2)}</span></h1>
        </div>
        <button onClick={openModal} disabled={loading ? true : false} className='w-1/2 bg-yellow-400'>
            Place Order
        </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to place your order?
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <h1 className="text-sm text-black font-poppins font-medium">Note:</h1>
                    <p className='text-sm text-gray-400 font-livvic'>Once your order has been approved you can no longer cancel it.</p>
                  </div>

                  <div className="flex mt-4 gap-5 justify-center items-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-10 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  bg-green px-10 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                      onClick={handlePlaceOrder}
                    >
                      Yes
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
    
)}

export default page