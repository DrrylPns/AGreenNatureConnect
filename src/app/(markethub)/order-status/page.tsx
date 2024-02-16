'use client'
import { Transaction, Variants } from '@/lib/types'
import { Tab } from '@headlessui/react'
import { OrderedVariant } from '@prisma/client'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Orders from '../components/Orders'
import ca from 'date-fns/esm/locale/ca/index.js'
import { revalidatePath } from 'next/cache'
import { RotatingLines } from 'react-loader-spinner'
import RotatingLinesLoading from '../components/RotatingLinesLoading'

function page() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [pending, setPending] = useState<Transaction[]>([])
    const [approved, setApproved] = useState<Transaction[]>([])
    const [pickup, setPickup] = useState<Transaction[]>([])
    const [completed, setCompleted] = useState<Transaction[]>([])
    const [cancelled, setCancelled] = useState<Transaction[]>([])
    const [isLoading, setIsLoading ] = useState<boolean>(true)
    useEffect(()=>{
        getPendingTransactions()
        getApprovedTransactions()
        getPickupTransactions()
        getCompletedTransactions()
        getCancelledTransactions()
    },[selectedIndex,isLoading])

    const getPendingTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/pending')
            setPending(transactions.data)
            setIsLoading(false)
        } catch (error) {
            
        }
      
    }
    const getApprovedTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/approved')
            setApproved(transactions.data)
            setIsLoading(false)
        } catch (error) {
            
        }

    }
    const getPickupTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/pickUp')
            setPickup(transactions.data)
            setIsLoading(false)
        } catch (error) {
            
        }
    }
    const getCompletedTransactions = async() =>{
        try {
            const transactions = await axios.get('/api/markethub/transaction/completed')
            setCompleted(transactions.data)
            setIsLoading(false)
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
    const handleCancel = async(transactionId: string) => {
        try {
            setIsLoading(true)
            await axios.post('/api/markethub/transaction/cancelled', {transactionId})
            .then(()=>{
                setIsLoading(false)
            })
        } catch (error) {
            
        }
        
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

export default page