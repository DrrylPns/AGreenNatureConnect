'use client'
import { Transaction, Variants } from '@/lib/types'
import { Tab } from '@headlessui/react'
import { OrderedVariant } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function page() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [pending, setPending] = useState<Transaction[]>([])
    const [approved, setApproved] = useState<Transaction[]>([])
    const [pickup, setPickup] = useState<Transaction[]>([])
    const [completed, setCompleted] = useState<Transaction[]>([])
    const [cancelled, setCancelled] = useState<Transaction[]>([])
    useEffect(()=>{
        getPendingTransactions()
        getApprovedTransactions()
        getPickupTransactions()
        getCompletedTransactions()
        getCancelledTransactions()
    },[selectedIndex])

    console.log(selectedIndex)
    console.log(pending)
    const getPendingTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/pending')
            setPending(transactions.data)
            console.log(transactions.data)
        } catch (error) {
            
        }
      
    }
    const getApprovedTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/approved')
            setApproved(transactions.data)
        } catch (error) {
            
        }

    }
    const getPickupTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/pickUp')
            setPickup(transactions.data)
        } catch (error) {
            
        }
    }
    const getCompletedTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/completed')
            setCompleted(transactions.data)
        } catch (error) {
            
        }
       
    }
    const getCancelledTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/cancelled')
            setCancelled(transactions.data)
        } catch (error) {
            
        }
    }
  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='w-full bg-green px-5 py-3'>
            <h1 className='text-white font-poppins font-bold text-[1.5rem]'>My order</h1>
        </div>
        <Tab.List>
            <Tab className="text-sm md:text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Orders
            </Tab>
            <Tab className="text-sm md:text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Approved
            </Tab>
            <Tab className="text-sm md:text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Pick Up
            </Tab>
            <Tab className="text-sm md:text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Completed
            </Tab>
            <Tab className="text-sm md:text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Cancelled
            </Tab>
        </Tab.List>
        <Tab.Panels>
            {/**PENDING */}
            <Tab.Panel>
                <div className='w-full min-h-screen'>
                    {selectedIndex == 0 && (
                        <div className='px-10'>
                            {pending.length > 0 ? pending.map((transaction: Transaction)=>(
                                <div className=' mt-5 border border-gray-200 shadow-sm drop-shadow-lg '>
                                    <div className='w-full px-10'>
                                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                    </div>
                                    <div className='flex px-5 sm:px-10 md:px-28 mt-10 items-center justify-between'>
                                        <div>
                                            {transaction.orderedVariant.map((variant)=>(
                                                <div className='flex flex-1 gap-10 md:gap-20 items-center '>
                                                    <Image 
                                                        src={variant.product.productImage} 
                                                        alt={variant.product.name} 
                                                        height={50}
                                                        width={50}
                                                        className=''
                                                    />  
                                                    <div>
                                                        <h1>{variant.product.name}</h1>
                                                        <p>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                                    </div>
                                                    <div className='ml-auto'>
                                                        <h1>P {variant.variant.price}</h1>    
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button className='px-5 py-2 md:px-10 md:py-5 rounded-md text-sm md:text-xl bg-red-500 text-white font-medium font-poppins'>Cancel</button>
                                        </div>
                                    </div>
                                    <div className='w-full border-y-2 text-right px-10 md:px-20 border-gray-300 py-2 md:py-4'>
                                        <h1 className=''>Order Total: <span>P {transaction.amount}</span></h1>
                                    </div>
                                </div>
                                )):(
                                <div>
                                    No pending orders
                                </div>
                            )
                        }
                                
                        </div>
                    )}
                </div>
            </Tab.Panel>
            {/**APPROVED */}
            <Tab.Panel>
                <div className='w-full min-h-screen'>
                    {selectedIndex == 1 && (
                        <div className='px-10'>
                            {approved.length > 0 ? approved.map((transaction: Transaction)=>(
                                <div className=' mt-5 shadow-md drop-shadow-lg '>
                                    <div className='w-full px-10'>
                                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                    </div>
                                    <div className='flex px-5 sm:px-10 md:px-28 mt-10 items-center justify-between'>
                                        <div>
                                            {transaction.orderedVariant.map((variant)=>(
                                                <div className='flex flex-1  gap-20 items-center '>
                                                    <Image 
                                                        src={variant.product.productImage} 
                                                        alt={variant.product.name} 
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1>{variant.product.name}</h1>
                                                        <p>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                                    </div>
                                                    <div className='ml-auto'>
                                                        <h1>{variant.variant.price}</h1>    
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button className='hidden px-10 py-5 rounded-md text-xl bg-red-500 text-white font-medium font-poppins'>Cancel</button>
                                        </div>
                                    </div>
                                    <div className='w-full border-y-2 text-right px-10 md:px-20 border-gray-700 py-4'>
                                        <h1 className=''>Order Total: <span>P {transaction.amount}</span></h1>
                                    </div>
                                </div>
                                )):(
                                <div>
                                    No approved orders
                                </div>
                            )
                        }
                                
                        </div>
                    )}
                </div>
            </Tab.Panel>
            {/**Pickup */}
            <Tab.Panel>
                <div className='w-full min-h-screen'>
                    {selectedIndex == 2 && (
                        <div className='px-10'>
                            {pickup.length > 0 ? pickup.map((transaction: Transaction)=>(
                                <div className=' mt-5 shadow-md drop-shadow-sm '>
                                    <div className='w-full px-10'>
                                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                    </div>
                                    <div className='flex px-5 sm:px-10 md:px-28 mt-10 items-center justify-between'>
                                        <div>
                                            {transaction.orderedVariant.map((variant)=>(
                                                <div className='flex flex-1  gap-20 items-center '>
                                                    <Image 
                                                        src={variant.product.productImage} 
                                                        alt={variant.product.name} 
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1>{variant.product.name}</h1>
                                                        <p>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                                    </div>
                                                    <div className='ml-auto'>
                                                        <h1>{variant.variant.price}</h1>    
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button className='px-10 py-5 rounded-md text-xl bg-red-500 text-white font-medium font-poppins'>Cancel</button>
                                        </div>
                                    </div>
                                    <div className='w-full border-y-2 text-right px-10 md:px-20 border-gray-700 py-4'>
                                        <h1 className=''>Order Total: <span>P {transaction.amount}</span></h1>
                                    </div>
                                </div>
                                )):(
                                <div>
                                    No orders that are ready to pick up or to deliver
                                </div>
                            )
                        }
                                
                        </div>
                    )}
                </div>
            </Tab.Panel>
            <Tab.Panel>
                <div className='w-full min-h-screen'>
                    {selectedIndex == 3 && (
                        <div className='px-10'>
                            {completed.length > 0 ? completed.map((transaction: Transaction)=>(
                                <div className=' mt-5 shadow-md drop-shadow-sm '>
                                    <div className='w-full px-10'>
                                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                    </div>
                                    <div className='flex px-5 sm:px-10 md:px-28 mt-10 items-center justify-between'>
                                        <div>
                                            {transaction.orderedVariant.map((variant)=>(
                                                <div className='flex flex-1  gap-20 items-center'>
                                                    <Image 
                                                        src={variant.product.productImage} 
                                                        alt={variant.product.name} 
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1>{variant.product.name}</h1>
                                                        <p>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                                    </div>
                                                    <div className='ml-auto'>
                                                        <h1>{variant.variant.price}</h1>    
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button className='hidden px-10 py-5 rounded-md text-xl bg-red-500 text-white font-medium font-poppins'>Cancel</button>
                                        </div>
                                    </div>
                                    <div className='w-full border-y-2 text-right px-10 md:px-20 border-gray-700 py-4'>
                                        <h1 className=''>Order Total: <span>P {transaction.amount}</span></h1>
                                    </div>
                                </div>
                                )):(
                                <div>
                                    No completed orders!
                                </div>
                            )
                        }
                                
                        </div>
                    )}
                </div>
            </Tab.Panel>
            {/**COMPLETED */}
            <Tab.Panel>
                <div className='w-full min-h-screen'>
                    {selectedIndex == 4 && (
                        <div className='px-10'>
                            {cancelled.length > 0 ? cancelled.map((transaction: Transaction)=>(
                                <div className=' mt-5 shadow-md drop-shadow-sm '>
                                    <div className='w-full px-10'>
                                        <h1 className='text-green font-semibold text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                    </div>
                                    <div className='flex px-5 sm:px-10 md:px-28 mt-10 items-center justify-between'>
                                        <div>
                                            {transaction.orderedVariant.map((variant)=>(
                                                <div className='flex flex-1  gap-20 items-center '>
                                                    <Image 
                                                        src={variant.product.productImage} 
                                                        alt={variant.product.name} 
                                                        height={50}
                                                        width={50}
                                                    />
                                                    <div>
                                                        <h1>{variant.product.name}</h1>
                                                        <p>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                                    </div>
                                                    <div className='ml-auto'>
                                                        <h1>{variant.variant.price}</h1>    
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <button className='hidden px-10 py-5 rounded-md text-xl bg-red-500 text-white font-medium font-poppins'>Cancel</button>
                                        </div>
                                    </div>
                                    <div className='w-full border-y-2 text-right px-10 md:px-20 border-gray-700 py-4'>
                                        <h1 className=''>Order Total: <span>P {transaction.amount}</span></h1>
                                    </div>
                                </div>
                                )):(
                                <div>
                                    No cancelled orders
                                </div>
                            )
                        }
                                
                        </div>
                    )}
                </div>
            </Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
  )
}

export default page