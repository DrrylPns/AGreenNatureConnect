import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Members from "/public/images/Members.png";
import Footer from '@/app/components/Footer/footer';



function page() {
  return (
    <div className='w-full'>
        
        <div className='pt-[5%] bg-red-300'>
            
            <div className='w-full'>
                <h1 className='font-livvic font-bold text-[36px] text-center'>
                    Organizational Chart
                </h1>
            </div>

            <div className='flex flex-row grid-cols-3 gap-52 justify-center m-10'>
                <div className='shadow-black shadow-lg p-3'>
                    <Link href="/about/NovaProper"
                        className="text-black font-mono font-semibold w-[160px] mt-10 md:p-3 p-3 border-none rounded-lg text-center ">
                        NOVA PROPER
                    </Link>
                </div>
                <div className='shadow-black shadow-lg p-3'>
                    <Link href="/about/Bagbag"
                        className="text-black font-mono font-semibold w-[160px] mt-10 md:p-3 p-3 border-none rounded-lg text-center">
                        BAGBAG
                    </Link>
                </div>
                <div className='shadow-black shadow-lg p-3'>
                    <Link href="/about/BagongSilangan"
                        className="text-black font-mono font-semibold w-[160px] mt-10 md:p-3 p-3 border-none rounded-lg text-center">
                        BAGONG SILANGAN
                    </Link>
                </div>
            </div>

            <div className='flex flex-row justify-center p-5'>
            <div className='mx-10'>
                        <Image
                                className="lg:block hidden flex-auto rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={200}/>

                            <div className='pb-3 shadow-black shadow-lg m-1'>
                                <p className='text-[19px] font-semibold text-center pt-2 '> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center '>Barangay Chairman</p>
                            </div>
            </div>

            </div>
            <div className='m-5'>
            <div className='flex flex-row grid-cols-3 justify-center p-5'>
                    <div className='mx-[15%]'>
                    <Image
                                className="lg:block hidden flex-auto rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>
                    <div className=''>
                    <Image
                                className="lg:block hidden flex-auto rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>
                    <div className='mx-[15%]'>
                    <Image
                                className="lg:block hidden flex-auto rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>                  
            </div> 

            <div className='flex flex-row grid-cols-3 justify-center p-5'>
                    <div className='mx-[15%]'>
                    <Image
                                className="lg:block hidden flex-auto  rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>
                    <div className=''>
                    <Image
                                className="lg:block hidden flex-auto rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>
                    <div className='mx-[15%]'>
                    <Image
                                className="lg:block hidden flex-auto  rounded-3xl border-2 border-white"
                                src={Members}
                                alt="Members.png"
                                width={170}/>

                            <div className='pb-3 shadow-black shadow-lg'>
                                 
                                <p className='text-[19px] font-semibold text-center pt-2 text-white'> Tiffany D. Lopez</p>
                                <p className='text-[14px] text-center text-white'>Barangay Chairman</p>
                            </div>
                    </div>                  
            </div>  
        </div>    
    </div>

    {/*Footer*/}
    <div className='border-t border-black'>
        <footer>
          <Footer />
        </footer> 
        </div>
    </div>
    
  )
}

export default page