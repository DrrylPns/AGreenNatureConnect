
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
                <div className=' py-3 px-3 rounded-2xl mx-72 bg-[#24643B] mt-5'>
                <div className='border-2 border-black'>
                    <div><h1 className='bg-[#FAD52F] py-5 text-center font-bold'>Ref No.{transaction?.referenceId}</h1></div>
                    
                    <div className='bg-[#ffffff] max-md:px-3 max-md:pt-3 max-md:mx-12 shadow-lg  flex flex-auto'>
                        <h1 className='text-center py-2 px-3 pr-14'><span className='font-bold'>Barangay:</span> {transaction?.seller.name}</h1>
                
                        <h1 className='text-center py-2 px-3 pl-14'><span className='font-bold'>Date:</span> {getDateFormatted()}</h1>
                    </div>   
                        <div className='bg-[#ffffff] py-2 pl-3 border-2 border-t-[#3b3b3b]'><h1>Recepient: {transaction?.buyer.name}</h1></div>
                    <div className='bg-[#ffffff]'>
                            <h1 className='text-center py-3 bg-[#d1e6d9]'><span className='font-bold'>Status:</span> {transaction?.status}</h1>
                        <div  className='bg-[#D9D9D9] rounded-full border-2 border-black text-center mt-2 py-2 font-bold mx-40'><h1>Total: {transaction?.amount}</h1></div><br/>
                        <h1 className=' px-5 text-justify'>"Please claim your purchase on {getDateFormatted()} at Barangay {transaction?.seller.name} "</h1><br/>          
                    </div>
                    </div>
                </div>

            </div>
        </Suspense>
    </div>
  )
}

export default page