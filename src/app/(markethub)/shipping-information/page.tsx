'use client'
import { Button } from '@/app/components/Ui/Button'
import { getAuthSession } from '@/lib/auth'
import prisma from '@/lib/db/db'
import { ShippingInfo } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { z } from 'zod'
import Loading from '../loading'

const schema = z.object({
    name: z.string().min(1),
    address: z.string(),
    email: z.string().email(),
    contactNumber: z.string().min(11),
    facebook: z.string()
})
type FormFields = z.infer<typeof schema>


function shippingInfo() {
    const {data: session} = useSession()
    const router = useRouter()
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>()
    
    if(shippingInfo){
        
    }
    let defaultValues = {
        name: shippingInfo?.name,
        address: shippingInfo?.address,
        email: shippingInfo?.email,
        contactNumber:shippingInfo?.phoneNumber,
        facebook: shippingInfo?.facebook
      }
    const { 
        register, 
        handleSubmit, 
        setError,
        setValue,
        formState: {errors, isSubmitting}} = useForm<FormFields>({
        resolver: zodResolver(schema)
    })

    useEffect(()=>{
        getShippingInfo()
    },[])
    
    useEffect(() => {
        if (shippingInfo) {
          setValue('name', shippingInfo.name);
          setValue('address', shippingInfo.address);
          setValue('email', shippingInfo.email);
          setValue('contactNumber', shippingInfo.phoneNumber);
          setValue('facebook', shippingInfo.facebook);
        }
      }, [shippingInfo]);

      const getShippingInfo = async () => {
        try {
            const shippingInfo = await (await axios.get(`/api/markethub/shippingInfo`)).data
            setShippingInfo(shippingInfo)
            setIsFetching(false)
     
            
        } catch (error) {
            return console.log(error)
        }
       
    }
    const onSubmit: SubmitHandler<FormFields> = async (data) =>{
        try {
           await axios.post(`/api/markethub/shippingInfo`,{data})
           .then(()=>{
            router.replace(`/cart/checkout`)
           })
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <button type='button' onClick={()=> router.back()}>
            <ArrowLeft className="text-lg" />
        </button>
        <h1 className='text-center'>Shipping information</h1>
        {isFetching && (
            <></>
        )}
        {!isFetching && (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full  h-dvh px-[20%]'>   
                <label htmlFor='name'>
                    Full Name:
                </label>
                <input {...register("name",{required: true})} id='name' className='border border-gray-400 rounded-md'/>
                {errors.name && (
                    <div className='text-red-500'>{errors.name.message}</div>
                )}
                <label htmlFor='address'>
                    Complete Address:
                </label>
                <input {...register("address" ,{required: true})} id='address' className='border border-gray-400 rounded-md'/>
                {errors.address && (
                    <div className='text-red-500'>Address is required!</div>
                )}
                <label htmlFor='email'>
                    Email:  
                </label >
                <input {...register("email")} id='email' className='border border-gray-400 rounded-md'/>
                {errors.email && (
                    <div className='text-red-500'>{errors.email.message}</div>
                )}
                <label>
                    Contact Number:
                </label>
                <input {...register("contactNumber",{required: true})} id='contactNumber' className='border border-gray-400 rounded-md'/>
                {errors.contactNumber && (
                    <div className='text-red-500'>{errors.contactNumber.message}</div>
                )}
                <label htmlFor='facebook'>
                    Facebook:
                </label>
                <input {...register("facebook",{required: true})} id='facebook' className='border border-gray-400 rounded-md'/>
                {errors.facebook && (
                    <div className='text-red-500'>{errors.facebook.message}</div>
                )}
                {isSubmitting ? (
                <Button disabled className='mt-10'>
                <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                Please wait
                    </Button>
                ):(
                    <Button type='submit' variant={'green'} disabled={isSubmitting} className='mt-10'>Submit</Button>
                )}
            
            </form>   
        )}
    </div>
  )
}

export default shippingInfo