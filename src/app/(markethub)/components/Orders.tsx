import RelativeDate from '@/app/components/RelativeDate';
import { Transaction } from '@/lib/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface OrdersProps {
    selectedIndex: number;
    noOrders: string;
    transactions: Transaction[];
    cancelBtnDisplay: "block" | "hidden";
    handleCancel: (transactionId: string) => void;
    status: string;
  }

const Orders: React.FC<OrdersProps> = ({ status, noOrders, selectedIndex, transactions, cancelBtnDisplay, handleCancel }) =>{

  return (
    <div className='w-full min-h-screen font-poppins transition-all ease-in-out duration-500 '>
    {selectedIndex == selectedIndex && (
        <div className=' '>
            {transactions.length > 0 ? transactions.map((transaction: Transaction)=>(
                <div className='mt-5 border bg-gray-100 border-gray-200 shadow-sm drop-shadow-lg w-[90%] md:w-[70%] lg:w-[60%] mx-auto'>
                    <div className='flex justify-between items-center w-full px-5 md:px-10 py-5 border-gray-200 border-b-2'>
                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                        <h1 className='text-sm text-gray-400' >Ordered on <RelativeDate dateString={transaction.createdAt} /></h1>
                    </div>
                    <div className='flex px-5 md:px-10 w-full my-5 gap-10 md:gap-x-20 items-center justify-center lg:justify-around transition-all ease-in-out duration-500'>
                        <div className='w-full'>
                            {transaction.orderedVariant.map((variant)=>(
                                <Link href={`/order-status/${transaction.id}`} className='w-full flex text-sm flex-1 gap-5 sm:gap-10 justify-between items-center transition-all ease-in-out duration-500'>
                                    <Image 
                                        src={variant.product.productImage} 
                                        alt={variant.product.name} 
                                        height={50}
                                        width={50}
                                        className=''
                                    />  
                                    <div className=''>
                                        <h1 className='font-semibold'>{variant.product.name}</h1>
                                        <p className='font-semibold text-gray-400 text-xs'>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                    </div>
                                    <div className='ml-auto font-semibold'>
                                        <h1>₱ {variant.variant.price}</h1>    
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className={`${cancelBtnDisplay}`}>
                            <button 
                                className={`${cancelBtnDisplay} px-5 py-2 md:px-10 md:py-3 rounded-md text-sm md:text-xl bg-red-500 text-white font-medium font-poppins transition-all ease-in-out duration-500`}
                                onClick={() => handleCancel(transaction.id)}
                                >
                                    Cancel
                                </button>
                        </div>
                    </div>
                    <div className='flex justify-between w-full border-y-2 text-right border-gray-300 bg-gray-200 px-5 md:px-10 py-2 md:py-4 transition-all ease-in-out duration-500'>
                        <h1 className='text-sm text-gray-400 font-semibold'>{status}</h1>
                        <h1 className=''>Order Total: <span>₱ {transaction.amount}</span></h1>
                    </div>
                </div>
                )):(
                <div className='w-full h-screen text-center mt-10'>
                    <h1 className='my-auto text-gray-400 font-semibold font-livvic'>{noOrders}</h1>
                </div>
            )
        }
                
        </div>
    )}
</div>
  )
}

export default Orders