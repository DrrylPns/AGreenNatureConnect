"use client"
import { Tab } from '@headlessui/react'
import React, { Suspense, useState } from 'react'
import RotatingLinesLoading from './RotatingLinesLoading'
import Orders from './Orders'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FaArrowLeft, FaBullseye } from 'react-icons/fa'
import { FiRefreshCw } from 'react-icons/fi'
import Loading from '../loading'

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
    pending,
    approved,
    pickup,
    cancelled,
    completed
}:{
    pending: Transaction[],
    approved: Transaction[],
    pickup:  Transaction[],
    cancelled: Transaction[],
    completed: Transaction[]
}) {
    const router = useRouter()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoading, setIsLoading ] = useState<boolean>(false);
    const [animate, setAnimate] = useState<boolean>(false)

    const handleCancel = async(transactionId : string)=>{
        setIsLoading(true)
        await axios.post('/api/markethub/transaction/cancelled', {transactionId}).then(()=>{
            router.refresh()
            
        })
        setIsLoading(false)
    }

    const handleGoBack = () => {
        setIsLoading(true)
        setTimeout(()=>{
            router.push('/markethub'); 

        },1000)
    };

    const handelRefresh = () => {
        setIsLoading(true)
        setAnimate(true)
        router.refresh()
        setTimeout(()=>{
            setIsLoading(false)
            setAnimate(false)
        },2000)
        console.log('clicked')
    }

    
    
  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='flex justify-between w-full text-white bg-green px-5 py-3'>
            <button onClick={handleGoBack} >
                <FaArrowLeft/>
            </button>
            <h1 className='text-white font-poppins font-bold text-[1.5rem]'>My order</h1>
            <button onClick={()=>  handelRefresh()} className={`${animate ? 'animate-spin text-yellow-400': ''} transition-all duration-1000 ease-in-out hover:scale-110`} >
                <FiRefreshCw/>
            </button>
        </div>
        <Tab.List>
            <Tab className="text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Orders
            </Tab>
            <Tab className="text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Approved
            </Tab>
            <Tab className="text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Pick Up
            </Tab>
            <Tab className="text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Completed
            </Tab>
            <Tab className="text-sm md:text-lg font-poppins font-semibold border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-2 px-4">
                Cancelled
            </Tab>
        </Tab.List>
        <Tab.Panels>
            {/**PENDING */}
            <Tab.Panel>
                {!isLoading ? (
                    <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={pending} 
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
                    transactions={approved} 
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
                    transactions={pickup} 
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
                    transactions={completed} 
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
                        transactions={cancelled} 
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
    </Tab.Group>
  )
}

export default OrderTab