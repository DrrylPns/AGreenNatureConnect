"use client"
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import RotatingLinesLoading from './RotatingLinesLoading'
import Orders from './Orders'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query'

interface Transaction {
    id: string;
    referenceId: string;
    amount: number;
    status: string;
    buyer: Buyer;
    seller: Community
    orderedVariant: OrderedVariant[]
    createdAt: Date;
    updatedAt: Date;
}
interface Community {
    id: string;
    name: string;
}
interface Buyer {
    id: string;
    name: string | null;
    username: string| null;
    email: string | null;
    image: string | null;
    middleName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    address: string | null;
}
interface OrderedVariant {
    id: string;
    product: Product;
    variant: Variants
}
interface Variants {
    id: string
    unitOfMeasurement: string;
    variant: number;
    price: number;
    EstimatedPieces: number;
}
interface Product {
    id: string;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    category: string;
    status: string;
    isFree: boolean;
}

function OrderTab({
}:{
}) {
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [animate, setAnimate] = useState<boolean>(false)

    const handleCancel = async(transactionId : string)=>{
        await axios.post('/api/markethub/transaction/cancelled', {transactionId}).then(()=>{
            router.refresh()
        })
    }

    const handleGoBack = () => {
        setTimeout(()=>{
            router.push('/markethub'); 

        },1000)
    };
    const handelRefresh = () => {
        refetch()
        setAnimate(true)
        router.refresh()
        setTimeout(()=>{
            setAnimate(false)
        },2000)
        console.log('clicked')
    }
    const { data, error, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
          try {
            const [pending, approved, pickUp, cancelled, completed] = await Promise.all([
              axios.get('/api/markethub/transaction/pending'),
              axios.get('/api/markethub/transaction/approved'),
              axios.get('/api/markethub/transaction/pickUp'),
              axios.get('/api/markethub/transaction/cancelled'),
              axios.get('/api/markethub/transaction/completed'),
            ]);
      
            return {
              pending: pending.data,
              approved: approved.data,
              pickUp: pickUp.data,
              cancelled: cancelled.data,
              completed: completed.data,
            };
          } catch (error: any) {
            throw new Error('Error fetching transactions: ' + error.message);
          }
        },
      });

  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='relative'>
        <div className='fixed z-30 top-20 flex justify-between w-full text-white bg-green px-5 py-3'>
            <button onClick={handleGoBack} >
                <FaArrowLeft/>
            </button>
            <h1 className='text-white font-poppins font-bold text-[1rem] sm:text-[1.5rem]'>My order</h1>
            <button onClick={()=>  handelRefresh()} className={`${animate ? 'animate-spin text-yellow-400': ''} transition-all duration-1000 ease-in-out hover:scale-110`} >
                <FiRefreshCw/>
            </button>
        </div>
        
        <Tab.List className={`fixed top-32 md:top-[8rem] w-full z-30 bg-white drop-shadow-md shadow-lg`}>
            <Tab className="text-[0.5rem] sm:text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Orders
            </Tab>
            <Tab className="text-[0.5rem] sm:text-sm  md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Approved
            </Tab>
            <Tab className="text-[0.5rem] sm:text-sm  md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Pick Up
            </Tab>
            <Tab className="text-[0.5rem] sm:text-sm  md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Completed
            </Tab>
            <Tab className="text-[0.5rem] sm:text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Cancelled
            </Tab>
        </Tab.List>
        {!isFetching ? (
            <Tab.Panels className={`pt-24 z-10`}>
             {/**PENDING */}
             <Tab.Panel>
                 {!isLoading ? (
                     <Orders 
                     selectedIndex={selectedIndex} 
                     transactions={data?.pending} 
                     noOrders='No pending orders right now!'
                     cancelBtnDisplay='block'
                     handleCancel={handleCancel}
                     status='Waiting to be approve.'
                     />
                 ):(
                     <div>
                         <RotatingLinesLoading/>
                     </div>
                 )}
             </Tab.Panel>
             {/**APPROVED */}
             <Tab.Panel>
                 {!isLoading ? (
                 <Orders 
                     selectedIndex={selectedIndex} 
                     transactions={data?.approved} 
                     noOrders='No approved orders right now!'
                     cancelBtnDisplay='hidden'
                     handleCancel={handleCancel}
                     status='Approved'
                 />
                 ):(
                     <div>
                         <RotatingLinesLoading/>
                     </div>
                 )}
           
             </Tab.Panel>
             {/**Pickup */}
             <Tab.Panel>
                {!isLoading ? (
                 <Orders 
                     selectedIndex={selectedIndex} 
                     transactions={data?.pickUp} 
                     noOrders='No orders are ready to be pick up!'
                     cancelBtnDisplay='hidden'
                     handleCancel={handleCancel}
                     status='Ready to be pickup!'
                 />
                 ):(
                     <div>
                         <RotatingLinesLoading/>
                     </div>
                 )}
           
             </Tab.Panel>
             {/**COMPLETED */}
             <Tab.Panel>
                {!isLoading ? (
                 <Orders 
                     selectedIndex={selectedIndex} 
                     transactions={data?.completed} 
                     noOrders='No completed orders!'
                     cancelBtnDisplay='hidden'
                     handleCancel={handleCancel}
                     status='Completed'
                 />
                 ):(
                     <div>
                         <RotatingLinesLoading/>
                     </div>
                 )}
             </Tab.Panel>
             {/**CANCELLED */}
             <Tab.Panel>
                 {!isLoading ? (
                     <Orders 
                         selectedIndex={selectedIndex} 
                         transactions={data?.cancelled} 
                         noOrders='No cancelled orders!'
                         cancelBtnDisplay='hidden'
                         handleCancel={handleCancel}
                         status='Cancelled'
                     />  
                 ):(
                     <div>
                         <RotatingLinesLoading/>
                     </div>
                 )}
             </Tab.Panel>
            </Tab.Panels>
        ):(
            <div className='flex justify-center items-center '>
                <RotatingLinesLoading/>
            </div>
        )}
       
        </div>
    </Tab.Group>
  )
}

export default OrderTab