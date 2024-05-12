import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Members from "/public/images/image-orgchart/bagbag8.jpg";
import Members1 from "/public/images/image-orgchart/bagbag9.jpg";
import Members2 from "/public/images/image-orgchart/bagbag10.jpg";
import Members3 from "/public/images/image-orgchart/bagbag1.jpg";
import Members4 from "/public/images/image-orgchart/bagbag2.jpg";
import Members5 from "/public/images/image-orgchart/bagbag6.jpg";
import Members6 from "/public/images/image-orgchart/bagbag5.jpg";
import Members7 from "/public/images/image-orgchart/bagbag3.jpg";
import Members8 from "/public/images/image-orgchart/bagbag4.jpg";
import Members9 from "/public/images/image-orgchart/bagbag11.jpg";
import Members10 from "/public/images/image-orgchart/bagbag7.jpg";
import Footer from '@/app/components/Footer/footer';



function page() {
  return (
    <div className='w-full'>
        
        <div className='md:pt-[5%] pt-[20%] bg-[#CFE2CE]'>
            
            <div className='w-full my-5'>
                <h1 className='font-poppins font-bold text-xl sm:text-7xl text-center'>
                    Organizational Chart
                </h1>
            </div>

            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-5 px-10 '>
                
                    <Link href="/about/NovaProper"
                        className="text-black font-poppins font-semibold py-3  border border-black border-1 rounded-full text-center bg-neutral-100 ">
                        BRGY. NOVA PROPER
                    </Link>
                
                    <Link href="/about/Bagbag"
                        className="text-black font-poppins font-semibold  py-3 border border-black border-1 rounded-full text-center bg-amber">
                        BRGY. BAGBAG
                    </Link>
               
                    <Link href="/about/BagongSilangan"
                        className="text-black font-poppins font-semibold py-3  border border-black border-1 rounded-full text-center bg-neutral-100">
                        BRGY. BAGONG SILANGAN
                    </Link>
                
            </div>

            
                <div className='md:flex grid md:flex-row grid-cols-1 justify-center md:p-5 p-3'>
                    <div className='md:my-5 my-3'>
                        <div className='mb-3 md:mb-0'>
                                <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members}
                                        alt="bagbag8.jpg"
                                        width={210}/>
                                </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[18px] font-semibold text-center pt-2 '> Richard B. Ambita, MPA</p>
                                    <p className='text-[16px] text-center '>Barangay Chairman</p>
                                </div>
                        </div>
                    </div>
                </div>
            

            <div className='md:m-5 m-3'>
            <div className='md:flex md:flex-row md:grid-cols-5 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members1}
                                    alt="bagbag9.jpg"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Evarista G. Pelayo</p>
                                <p className='text-[14px] text-center'>Barangay Treasurer</p>
                            </div>
                    </div>
                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members2}
                                    alt="bagbag10.jpg"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Ronald V. Pastor</p>
                                <p className='text-[14px] text-center'>Barangay Secretary</p>
                            </div>
                    </div>    
            </div> 

            <div className='md:m-5 m-3'>
                <div className='md:flex md:flex-row md:grid-cols-5 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                        <div className='mb-3 md:mb-0'>
                                <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members3}
                                        alt="bagbag1.jpg"
                                        width={210}/>
                                </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[15px] font-semibold text-center pt-2'> Hon. Rico S. Calesterio</p>
                                    <p className='text-[13px] text-center'>Committee of Environment</p>
                                </div>
                        </div>
                        <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members4}
                                        alt="bagbag2.jpg"
                                        width={210}/>
                            </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[15px] font-semibold text-center pt-2'> Hon. Marry Ann U. Ambita</p>
                                    <p className='text-[12px] text-center'>Committee on Women and Family <br /> Acceptance Ways & Means</p>
                                </div>
                        </div>

                        <div className='mb-3 md:mb-0'>
                                <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members5}
                                        alt="bagbag6.jpg"
                                        width={210}/>
                                </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[14px] font-semibold text-center pt-2'> Hon. Michelle Joy L. Vitangcol</p>
                                    <p className='text-[12px] text-center'>Committee on Badac Advocacy <br /> Inspection  Health & Sanitation</p>
                                    
                                </div>
                        </div>     

                        <div className='mb-3 md:mb-0'>
                                <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members6}
                                        alt="bagbag5.jpg"
                                        width={210}/>
                                </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[16px] font-semibold text-center pt-2'> Hon. Bernard L. Gappi</p>
                                    <p className='text-[14px] text-center'>Committee on Livelihood Finance</p>
                                </div>
                        </div>
                        <div className='mb-3 md:mb-0'>
                                <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                    <Image
                                        className="w-full object-cover h-full rounded-t-2xl"
                                        src={Members7}
                                        alt="bagbag3.jpg"
                                        width={210}/>
                                </div>

                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                    <p className='text-[16px] font-semibold text-center pt-2'> Hon. Jayson S. Paliza</p>
                                    <p className='text-[12px] text-center'>Committee of Appropriation Urban <br /> Poor Transportation Communication</p>
                                </div>
                        </div>                
                </div>
            </div>

            <div className='md:m-5 m-3'>
            <div className='md:flex md:flex-row md:grid-cols-5 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members8}
                                    alt="bagbag4.jpg"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>  
                                <p className='text-[14px] font-semibold text-center pt-2'> Hon. Jonjon R. Llegado, Jr.</p>
                                <p className='text-[12px] text-center'>Committee on Badac Operation Peace <br /> & Order BDRRMC Bids & Awards</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members9}
                                    alt="bagbag11.jpg"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[13px] font-semibold text-center pt-2'> Hon. Lord Bendamin Michael P. Canlas</p>
                                <p className='text-[12px] text-center'>Committee of OFW & Migrants</p>
                            </div>
                    </div>  

                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members10}
                                    alt="bagbag7.jpg"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>      
                                <p className='text-[16px] font-semibold text-center pt-2'> Hon. Mark Ian B. Rivera</p>
                                <p className='text-[14px] text-center'>SK Chairperson</p>
                            </div>
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