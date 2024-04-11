import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Members from "/public/images/image-orgchart/bagongs/bs1.png";
import Members1 from "/public/images/image-orgchart/bagongs/bs2.png";
import Members2 from "/public/images/image-orgchart/bagongs/bs3.png";
import Members3 from "/public/images/image-orgchart/bagongs/bs4.png";
import Members4 from "/public/images/image-orgchart/bagongs/bs5.png";
import Members5 from "/public/images/image-orgchart/bagongs/bs6.png";
import Members6 from "/public/images/image-orgchart/bagongs/bs7.png";
import Members7 from "/public/images/image-orgchart/bagongs/bs8.png";
import Members8 from "/public/images/image-orgchart/bagongs/bs9.png";
import Members9 from "/public/images/image-orgchart/bagongs/bs10.png";
import Members10 from "/public/images/image-orgchart/bagongs/bs11.png";
import Members11 from "/public/images/image-orgchart/bagongs/bs12.png";
import Members12 from "/public/images/image-orgchart/bagongs/bs13.png";
import Members13 from "/public/images/image-orgchart/bagongs/bs14.png";
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
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-neutral-100">
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
                        className="text-black font-poppins font-semibold h-[50px] w-[160px] mt-10 md:p-3 p-3 border border-black border-1 rounded-full text-center bg-amber">
                        BAGONG SILANGAN
                    </Link>
                </div>
            </div>

            <div className='flex flex-row justify-center p-5'>
            <div className='mx-10'>
                        <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members}
                                alt="bs1.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2 '>Hon. Wilfredo L. Cara</p>
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
                                alt="bs2.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Hon. Federick Vincent D. Marcelo</p>
                                <p className='text-[14px] text-center'>Brgy. Kagawad</p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members2}
                                alt="bs3.png"
                                width={210}
                                height={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Alvie Espineli</p>
                                <p className='text-[15px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members3}
                                alt="bs4.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Ronald Jeff Velasco</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members4}
                                alt="bs5.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Marilyn Barlomento</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members5}
                                alt="bs6.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Asnairah Macaagir</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>    
            </div>
            </div>
            
            <div className='m-5'>
            <div className='flex flex-row grid-cols-3 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members6}
                                alt="bs7.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Elizabeth Afuang</p>
                                <p className='text-[14px] text-center'></p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members7}
                                alt="bs8.png"
                                width={210}
                                height={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Steven Estacio</p>
                                <p className='text-[15px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members8}
                                alt="bs9.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Marilyn Mahinay</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members9}
                                alt="bs10.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Franaret Ladia</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members10}
                                alt="bs11.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Nicky Ryan Mon</p>
                                <p className='text-[16px] text-center'></p>
                            </div>
                    </div>    
            </div>
            </div>

            <div className='m-5'>
            <div className='flex flex-row grid-cols-3 justify-center p-5'>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members11}
                                alt="bs12.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[16px] font-semibold text-center pt-2'>Ronald Borbo</p>
                                <p className='text-[14px] text-center'></p>
                            </div>
                    </div>
                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members12}
                                alt="bs13.png"
                                width={210}
                                height={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Ricardo Aguilar</p>
                                <p className='text-[15px] text-center'></p>
                            </div>
                    </div>

                    <div className='mr-10 ml-10'>
                    <Image
                                className="lg:block hidden flex-auto rounded-t-2xl border border-b-0 border-1 border-black"
                                src={Members13}
                                alt="bs14.png"
                                width={210}/>

                            <div className='h-[80px] w-[210px] border bg-white rounded-b-2xl border-black'>
                                <p className='text-[18px] font-semibold text-center pt-2'>Isagani Ladia</p>
                                <p className='text-[16px] text-center'></p>
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
                     