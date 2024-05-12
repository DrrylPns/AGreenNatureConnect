import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Members from "/public/images/image-orgchart/nova/nova1.png";
import Members1 from "/public/images/image-orgchart/nova/nova2.png";
import Members2 from "/public/images/image-orgchart/nova/nova3.png";
import Members3 from "/public/images/image-orgchart/nova/nova4.png";
import Members4 from "/public/images/image-orgchart/nova/nova3.png";
import Members5 from "/public/images/image-orgchart/nova/nova5.png";
import Members6 from "/public/images/image-orgchart/nova/nova6.png";
import Members7 from "/public/images/image-orgchart/nova/nova7.png";
import Members8 from "/public/images/image-orgchart/nova/nova8.png";
import Members9 from "/public/images/image-orgchart/nova/nova9.png";
import Members10 from "/public/images/image-orgchart/nova/nova10.png";
import Members11 from "/public/images/image-orgchart/nova/nova11.png";
import Members12 from "/public/images/image-orgchart/nova/nova12.png";
import Members13 from "/public/images/image-orgchart/nova/nova13.png";
import Members14 from "/public/images/image-orgchart/nova/nova14.png";
import Members15 from "/public/images/image-orgchart/nova/nova15.png";
import Members16 from "/public/images/image-orgchart/nova/nova16.png";
import Members17 from "/public/images/image-orgchart/nova/nova17.png";
import Members18 from "/public/images/image-orgchart/nova/nova18.png";
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
                
                    <Link 
                        href="/about/NovaProper"
                        className="text-black font-poppins font-semibold py-3  border border-black border-1 rounded-full text-center bg-amber">
                        BRGY. NOVA PROPER
                    </Link>
                    <Link 
                        href="/about/Bagbag"
                        className="text-black font-poppins font-semibold  py-3 border border-black border-1 rounded-full text-center bg-neutral-100">
                        BRGY. BAGBAG
                    </Link>
                    <Link 
                        href="/about/BagongSilangan"
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
                                        alt="nova1.png"
                                        width={210}/>

                                </div>
                                <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black '>
                                    <p className='text-[18px] font-semibold text-center pt-2 '>Asuncion M. Visaya</p>
                                    <p className='text-[16px] text-center '>Barangay Chairwoman</p>
                                </div>
                </div>
            </div>
            </div>
            <div className='md:m-5 m-3'>
            <div className='md:flex md:flex-row md:grid-cols-3 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members1}
                                    alt="nova2.png"
                                    width={210}
                                />
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Enriquez P. Añonuevo</p>
                                <p className='text-[16px] text-center'>BESWC Head</p>
                            </div>
                    </div>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members2}
                                    alt="nova3.png"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Hon. Ma. Cecilia M. Ramos</p>
                                <p className='text-[15px] text-center'>BESWC Vice Head</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members3}
                                    alt="nova4.png"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Gina Magdahong</p>
                                <p className='text-[16px] text-center'>MRF Supervisor</p>
                            </div>
                    </div>     
            </div> 

            <div className='md:flex md:flex-row md:grid-cols-5 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members4}
                                    alt="nova3.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Hon. Ma. Cecilia M Ramos</p>
                                <p className='text-[15px] text-center'>Committee on Women</p>
                            </div>
                    </div>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members5}
                                    alt="nova5.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Ella Gatchalian</p>
                                <p className='text-[16px] text-center'>Committee of 4P's</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members6}
                                    alt="nova6.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Precy Nueva</p>
                                <p className='text-[16px] text-center'>Committee of OFW</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members7}
                                    alt="nova8.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Annalyn Aquino</p>
                                <p className='text-[16px] text-center'>Committee of Solo Parent</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members8}
                                    alt="nova9.png"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>John R. Bernal</p>
                                <p className='text-[16px] text-center'>Focal Person of LGBT</p>
                            </div>
                    </div>     
            </div>

            <div className='md:flex md:flex-row md:grid-cols-4 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members9}
                                    alt="nova9.png"
                                    width={210}/>
                            </div>

                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>SF04 Christopher F. Navarro</p>
                                <p className='text-[14px] text-center'>Bureau of Fire Protection</p>
                            </div>
                    </div>
                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members10}
                                    alt="nova10.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>PLTCOL. Jerry O. Castillo</p>
                                <p className='text-[15px] text-center'>QCPD Station 4</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members10}
                                    alt="nova10.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Henry B. Cudilla</p>
                                <p className='text-[16px] text-center'>Committee on Peace and Orders</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members12}
                                    alt="nova12.png"
                                    width={210}/>
                            </div>
                            <div className='h-[80px] w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Arien Lein Ibardo</p>
                                <p className='text-[16px] text-center'>SK Chairman</p>
                            </div>
                    </div>    
            </div>

            <div className='md:flex md:flex-row md:grid-cols-6 grid-cols-2 md:gap-5 gap-5 justify-center md:p-5 p-3'>
                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members13}
                                    alt="nova13.png"
                                    width={210}/>

                            </div>
                            <div className='h-[75px]  w-full  border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Cherrylin Ocampo</p>
                                <p className='text-[14px] text-center'>Farmer</p>
                            </div>
                    </div>
                    <div className='mb-3 md:mb-0'>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members14}
                                    alt="nova14.png"
                                    width={210}/>
                            </div>

                            <div className='h-[75px]  w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Mayclirin Sison</p>
                                <p className='text-[14px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members15}
                                    alt="nova15.png"
                                    width={210}/>
                            </div>

                            <div className='h-[75px]  w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Emilio Añonuevo</p>
                                <p className='text-[16px] text-center'>Famer</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members16}
                                    alt="nova16.png"
                                    width={210}/>
                            </div>

                            <div className='h-[75px]  w-full  border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Francisco De Vicente</p>
                                <p className='text-[16px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members17}
                                    alt="nova17.png"
                                    width={210}/>
                            </div>

                            <div className='h-[75px]  w-full  border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Marivic Villareal</p>
                                <p className='text-[16px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mb-3 md:mb-0 '>
                            <div className='w-full h-2/3 rounded-t-2xl border border-b-0 border-1 border-black'>
                                <Image
                                    className="w-full object-cover h-full rounded-t-2xl"
                                    src={Members18}
                                    alt="nova18.png"
                                    width={210}/>
                            </div>

                            <div className='h-[75px]  w-full border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Nelia Bernardo</p>
                                <p className='text-[16px] text-center'>Farmer</p>
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