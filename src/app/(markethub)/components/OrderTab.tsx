"use client"
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import RotatingLinesLoading from './RotatingLinesLoading'
import Orders from './Orders'
import axios from 'axios'

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
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isLoading, setIsLoading ] = useState<boolean>(true)

    const handleCancel = async(transactionId : string)=>{
        await axios.post('/api/markethub/transaction/cancelled', transactionId)
    }

  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='w-full bg-green px-5 py-3'>
            <h1 className='text-white font-poppins font-bold text-[1.5rem]'>My order</h1>
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
                {isLoading ? (
                    <RotatingLinesLoading/>
                ):(
                    <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={pending} 
                    noOrders='No pending orders right now!'
                    cancelBtnDisplay='block'
                    handleCancel={handleCancel}
                    status='Waiting to be approve.'
                    />
                )}
                
            </Tab.Panel>
            {/**APPROVED */}
            <Tab.Panel>
                {isLoading ? (
                    <RotatingLinesLoading/>
                ):(
                <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={approved} 
                    noOrders='No approved orders right now!'
                    cancelBtnDisplay='hidden'
                    handleCancel={handleCancel}
                    status='Approved'
                />
                )}
            </Tab.Panel>
            {/**Pickup */}
            <Tab.Panel>
                {isLoading ? (
                    <RotatingLinesLoading/>
                ):(
                <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={pickup} 
                    noOrders='No orders are ready to be pick up!'
                    cancelBtnDisplay='hidden'
                    handleCancel={handleCancel}
                    status='Ready to be pickup!'
                />
                )}
            </Tab.Panel>
            {/**COMPLETED */}
            <Tab.Panel>
                {isLoading ? (
                    <RotatingLinesLoading/>
                ):(
                <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={completed} 
                    noOrders='No completed orders!'
                    cancelBtnDisplay='hidden'
                    handleCancel={handleCancel}
                    status='Completed'
                />
                )}
            </Tab.Panel>
            {/**CANCELLED */}
            <Tab.Panel>
                {isLoading ? (
                    <RotatingLinesLoading/>
                ):(
                <Orders 
                    selectedIndex={selectedIndex} 
                    transactions={cancelled} 
                    noOrders='No cancelled orders!'
                    cancelBtnDisplay='hidden'
                    handleCancel={handleCancel}
                    status='Cancelled'
                />
                )}
            </Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
  )
}

export default OrderTab