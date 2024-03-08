
import prisma from '@/lib/db/db';
import React, { FC, Suspense } from 'react'
import Loading from '../../loading';
import ArrowBack from '../../components/ArrowBack';
import RelativeDate from '@/app/components/RelativeDate';

interface Props {
    params: { transactionId: string };

  }

  
const page: FC<Props> = async({ params }) => {
    const transaction = await prisma.transaction.findUnique({
        where:{
            id: params.transactionId
        },
        include:{
            buyer: true,
            seller: true,
            orderedVariant:{
                include:{
                    variant: true,
                    product: true
                }
            }
        }
    })

    function getDateFormatted(){
        if(transaction){
            const date = new Date(transaction.createdAt)
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
          return date.toLocaleDateString(undefined, options);
        }
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div>
        <div className='relative w-full bg-green px-5 py-3 text-white'>
            <h1 className='text-center text-white font-poppins font-bold text-xs sm:text-[1.5rem]'>Order Details</h1>
            <div className='absolute top-3 left-3'>
                <ArrowBack/>
            </div>
        </div>
        <Suspense fallback={<Loading/>}>
            <div>
                <div className='mt-5 mx-96 font-poppins'>
                <div className='border-2   border-[#3b754a] shadow-2xl'>
                    <div><h1 className=' py-5 text-center font-bold border-2 border-b-[#ebefbb] border-white mx-4'>Ref No.{transaction?.referenceId}</h1></div>
                    
                    <div className='bg-[#ffffff] max-md:px-3 max-md:pt-3 max-md:mx-12'>
                        <h1 className='pt-3 pl-20 pt'><span className='font-bold'>Barangay:</span><span className='text-[#686464] ml-16 pl-2'> {transaction?.seller.name}</span></h1>
                
                        <h1 className='py-3 pl-20'><span className='font-bold'>Date:</span><span className='text-[#686464] ml-28'> {getDateFormatted()}</span></h1>
                    </div>  <br/>
                        <div className='bg-[#ffffff] py-2 pl-20'><h1><span className='font-bold'>Recepient:</span><span className='text-[#686464] ml-14 pl-4'> "{transaction?.buyer.name}"</span></h1></div>
                    <div className='bg-[#ffffff]'>
                            <h1 className='py-3 pl-20'><span className='font-bold'>Status:</span><span className='text-[#686464] ml-24 pl-1'> {transaction?.status}</span></h1><br/>
                        <div  className='border-2 border-t-grey border-white mt-2 py-2 pl-20 font-bold'><h1>Total: <span className='text-[#205330] ml-28 px-5 border-2 border-b-black border-white'> {transaction?.amount}</span></h1></div><br/><br/>
                        <h1 className=' mx-5 py-2 text-center text-[#459d62] border-2 border-t-[#2c2d22] border-white'>"Please claim your purchase on {getDateFormatted()} at Barangay {transaction?.seller.name} "</h1>        
                    </div>
                    </div>
                </div>

            </div><br/>
        </Suspense>
    </div>
  )
}

export default page