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
        
        <div className='pt-[5%] bg-[#CFE2CE]'>
            
            <div className='w-full'>
                <h1 className='font-poppins font-bold text-[36px] text-center'>
                    Organizational Chart
                </h1>
            </div>

            <div className='flex flex-row grid-cols-3 gap-52 justify-center m-5'>
                <div className='p-3'>
                    <Link href="/about/NovaProper"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-amber">
                        NOVA PROPER
                    </Link>
                </div>
                <div className='p-3'>
                    <Link href="/about/Bagbag"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-neutral-100">
                        BAGBAG
                    </Link>
                </div>
                <div className='p-3'>
                    <Link href="/about/BagongSilangan"
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-neutral-100">
                        BAGONG SILANGAN
                    </Link>
                </div>
            </div>

            <div className='flex flex-row justify-center p-5'>
            <div className='mx-10'>
                        <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members}
                                alt="nova1.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2 '>Asuncion M. Visaya</p>
                                <p className='text-[16px] text-center '>Barangay Chairman</p>
                            </div>
            </div>

            </div>
            <div className='m-5'>
            <div className='flex flex-row grid-cols-3 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members1}
                                alt="nova2.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Enriquez P. Añonuevo</p>
                                <p className='text-[16px] text-center'>BESWC Head</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members2}
                                alt="nova3.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Hon. Ma. Cecilia M. Ramos</p>
                                <p className='text-[15px] text-center'>BESWC Vice Head</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members3}
                                alt="nova4.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Gina Magdahong</p>
                                <p className='text-[16px] text-center'>MRF Supervisor</p>
                            </div>
                    </div>     
            </div> 

            <div className='flex flex-row grid-cols-5 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members4}
                                alt="nova3.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Hon. Ma. Cecilia M Ramos</p>
                                <p className='text-[15px] text-center'>Committee on Women</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members5}
                                alt="nova5.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Ella Gatchalian</p>
                                <p className='text-[16px] text-center'>Committee of 4P's</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members6}
                                alt="nova6.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Precy Nueva</p>
                                <p className='text-[16px] text-center'>Committee of OFW</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members7}
                                alt="nova8.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Annalyn Aquino</p>
                                <p className='text-[16px] text-center'>Committee of Solo Parent</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members8}
                                alt="nova9.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>John R. Bernal</p>
                                <p className='text-[16px] text-center'>Focal Person of LGBT</p>
                            </div>
                    </div>     
            </div>

            <div className='flex flex-row grid-cols-4 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members9}
                                alt="nova9.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>SF04 Christopher F. Navarro</p>
                                <p className='text-[14px] text-center'>Bureau of Fire Protection</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members10}
                                alt="nova10.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>PLTCOL. Jerry O. Castillo</p>
                                <p className='text-[15px] text-center'>QCPD Station 4</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members11}
                                alt="nova11.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Henry B. Cudilla</p>
                                <p className='text-[16px] text-center'>Committee on Peace and Orders</p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members12}
                                alt="nova12.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Hon. Arien Lein Ibardo</p>
                                <p className='text-[16px] text-center'>SK Chairman</p>
                            </div>
                    </div>    
            </div>

            <div className='flex flex-row grid-cols-6 justify-center p-5'>
                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members13}
                                alt="nova13.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Cherrylin Ocampo</p>
                                <p className='text-[14px] text-center'>Farmer</p>
                            </div>
                    </div>
                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members14}
                                alt="nova14.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Mayclirin Sison</p>
                                <p className='text-[14px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members15}
                                alt="nova15.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Emilio Añonuevo</p>
                                <p className='text-[16px] text-center'>Famer</p>
                            </div>
                    </div>

                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members16}
                                alt="nova16.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Francisco De Vicente</p>
                                <p className='text-[16px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members17}
                                alt="nova17.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Marivic Villareal</p>
                                <p className='text-[16px] text-center'>Farmer</p>
                            </div>
                    </div>

                    <div className='mr-7 ml-7'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members18}
                                alt="nova18.png"
                                width={190}/>

                            <div className='h-[75px] w-[190px] border bg-white rounded-b-2xl border-black'>
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