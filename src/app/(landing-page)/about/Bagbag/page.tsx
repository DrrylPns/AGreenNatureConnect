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
        
        <div className='pt-[5%] bg-[#CFE2CE]'>
            
            <div className='w-full'>
                <h1 className='font-poppins font-bold text-[36px] text-center'>
                    Organizational Chart
                </h1>
            </div>

            <div className='flex flex-row grid-cols-3 gap-52 justify-center m-5'>
                <div className='p-3'>
                    <Link href="/about/NovaProper"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-neutral-100 ">
                        BRGY. NOVA PROPER
                    </Link>
                </div>
                <div className='p-3'>
                    <Link href="/about/Bagbag"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-amber">
                        BRGY. BAGBAG
                    </Link>
                </div>
                <div className='p-3'>
                    <Link href="/about/BagongSilangan"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-neutral-100">
                        BRGY. BAGONG SILANGAN
                    </Link>
                </div>
            </div>

            <div className='flex flex-row justify-center p-5'>
            <div className='mx-10'>
                        <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members}
                                alt="bagbag8.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2 '> Richard B. Ambita, MPA</p>
                                <p className='text-[14px] text-center '>Barangay Chairman</p>
                            </div>
            </div>
            </div>

            <div className='m-5'>
            <div className='flex flex-row grid-cols-2 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members1}
                                alt="bagbag9.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Evarista G. Pelayo</p>
                                <p className='text-[14px] text-center'>Barangay Treasurer</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members2}
                                alt="bagbag10.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Ronald V. Pastor</p>
                                <p className='text-[14px] text-center'>Barangay Secretary</p>
                            </div>
                    </div>    
            </div> 

            <div className='flex flex-row grid-cols-5 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members3}
                                alt="bagbag1.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[15px] font-semibold text-center pt-2'> Hon. Rico S. Calesterio</p>
                                <p className='text-[13px] text-center'>Committee of Environment</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members4}
                                alt="bagbag2.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[15px] font-semibold text-center pt-2'> Hon. Marry Ann U. Ambita</p>
                                <p className='text-[12px] text-center'>Committee on Women and Family Acceptance Ways & Means</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members5}
                                alt="bagbag6.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[14px] font-semibold text-center pt-2'> Hon. Michelle Joy L. Vitangcol</p>
                                <p className='text-[12px] text-center'>Committee on Badac Advocacy Inspection Health & Sanitation</p>
                            </div>
                    </div>     

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members6}
                                alt="bagbag5.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Hon. Bernard L. Gappi</p>
                                <p className='text-[14px] text-center'>Committee on Livelihood Finance</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members7}
                                alt="bagbag3.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'> Hon. Jayson S. Paliza</p>
                                <p className='text-[12px] text-center'>Committee of Appropriation Urban Poor Transportation Communication</p>
                            </div>
                    </div>                
            </div>

            <div className='flex flex-row grid-cols-5 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members8}
                                alt="bagbag4.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                 
                                <p className='text-[14px] font-semibold text-center pt-2'> Hon. Jonjon R. Llegado, Jr.</p>
                                <p className='text-[12px] text-center'>Committee on Badac Operation Peace & Order BDRRMC Bids & Awards</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members9}
                                alt="bagbag11.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                 
                                <p className='text-[14px] font-semibold text-center pt-2'> Hon. Lord Bendamin Michael P. Canlas</p>
                                <p className='text-[12px] text-center'>Committee of OFW & Migrants</p>
                            </div>
                    </div>  

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members10}
                                alt="bagbag7.jpg"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                 
                                <p className='text-[16px] font-semibold text-center pt-2'> Hon. Mark Ian B. Rivera</p>
                                <p className='text-[14px] text-center'>SK Chairperson</p>
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