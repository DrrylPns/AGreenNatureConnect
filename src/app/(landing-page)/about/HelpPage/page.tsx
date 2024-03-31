import React from 'react'
import Image from "next/image";
import Search from "/public/images/Search-Icon.png";
import Icon from "/public/images/Icon-help.png";
import Footer from '@/app/components/Footer/footer';

function page() {
  return (
    <div className='w-full'>
        <div className='pt-[5%]'>

          <div className='p-10 bg-[#B9DEB7] flex flex-row grid-cols-2 gap-40'>

              <div className='px-10 pt-10 '>
                <h1 className='font-bold lg:text-[50px] md:text-[40px] text-[20px] '>How can we help you today?</h1>
                <p className=' font-livvic lg:text-[22px] md:text-[20px] text-[10px] py-5'>Welcome to AGreen Nature Connect’s Help Center</p>

                <div className='shadow-black shadow-md rounded-full bg-white mt-10 px-10'> 
                    <p className='p-5 '>Search</p>
                </div>

                

              </div>

              <div className='px-10 '>
                <Image
                            className="lg:block hidden rounded-lg pt-3"
                            src={Icon}
                            alt="Icon-help.png"
                            width={400}/>
              </div>
      
          </div>

        </div>
    </div>
  )
}

export default page