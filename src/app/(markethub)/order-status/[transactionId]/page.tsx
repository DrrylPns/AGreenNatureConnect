
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
                <div className=' py-3 px-3 rounded-2xl mx-72 bg-[#C1C1C1] mt-5'>
                    <div><h1 className='bg-[#FAD52F] py-5 text-center font-bold'>Ref No.{transaction?.referenceId}</h1></div>
                    <div className='bg-[#24643B] px-10 max-md:px-3 max-md:pt-3  py-5  max-md:mx-12 shadow-lg  '>
                            <h1 className='text-white text-center ml-72 px-2 py-2 bg-[#198f51]'><span className='font-bold'>Date:</span> {getDateFormatted()}</h1>
                    </div>
                        <div><h1 className='text-white py-2 px-2 bg-[#198f51]'><span className='font-bold'>Barangay:</span> {transaction?.seller.name}</h1></div>
                        <div className='bg-[#D9D9D9] py-2  pl-3'><h1>Recepient: {transaction?.buyer.name}</h1></div>
                    <div className='bg-[#198f51]'>
                            <h1 className='text-white text-center py-3 bg-[#287e47]'><span className='font-bold'>Status:</span> {transaction?.status}</h1>
                        <div  className='bg-[#2C623F] text-white rounded-full text-center mt-2 py-2 font-bold mx-40'><h1>Total: {transaction?.amount}</h1></div><br/>
                        <h1 className='text-white px-5 text-justify'>"Please claim your purchase on {getDateFormatted()} at Barangay {transaction?.seller.name} "</h1><br/>          
                    </div>
                </div>

            </div>
        </Suspense>
    </div>
  )
}

export default page