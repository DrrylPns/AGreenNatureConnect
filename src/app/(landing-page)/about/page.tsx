import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Sharon from "/public/images/Sharon.png";
import SoloParent from "/public/images/SoloParent.png";
import Greenland from "/public/images/Greenland.png";
import Image1 from "/public/images/image 1.png";
import Image2 from "/public/images/image 2.png";
import Image3 from "/public/images/image 3.png";
import Members from "/public/images/Members.png";
import Footer from '@/app/components/Footer/footer';

function page() {
  return (
    <div className=''>
      {/*Header*/}
      <div className={`h-[60vh] bg-cover bg-center bg-[url('../../../public/images/bannerbg.png')] md:px-20 px-10 flex flex-col justify-center`}>
        <h1 className='font-Inter font-mono font-semibold text-center lg:leading-[70px] md:leading-[50px] leading-[30px] text-amber lg:text-[60px] md:text-[40px] text-[20px]'>About Us</h1>
      </div>

      {/*About Community*/}
      <div className='m-10 '>
          <div className='mx-10 m-10'>
              <h3 className='font-livvic font-semibold text-[24px]'>About the</h3>
              <h2 className='font-livvic font-bold text-[36px]'> Community Farm</h2>
          </div>
        
        <div className='m-10'>
            <div className='flex flex-row text-justify my-10'>
                    <div className='mx-12'>
                        <Image
                          className="lg:block hidden rounded-lg pt-3"
                          src={Sharon}
                          alt="Sharon.png"
                          width={5000}/>
                    </div>
                    <div className='mx-12'>
                        <h1 className='font-poppins font-bold mb-5 text-[28px]'>Sharon Urban Farming</h1>
                        <p className='text-[18px]'>
                          Sharon Urban Farming, the name of community farm of barangay Nova Proper. it is currently manage by Enrique P. Añonuevo, 
                          a BESWMC Head of Sharon Urban Farming. Sharon Farm, an integrated urban farm situated at the heart of the city, was launched 
                          last June 2, 2021, with collaborative efforts and partnership between public and private stakeholders. The area owned by the 
                          Diocese of Novaliches that is approximately 5,500 square meter before the Gulayan sa Siyudad project. This program and movement 
                          aim to improve the access of urban settlers and disadvantaged groups to safe and nutritious food, promote social inclusion, and 
                          become an important means for recreation and educational activities for the community.

                        </p>
                    </div>
              </div>
              <div className='flex flex-row text-justify my-10'>
                  <div className='mx-12'>
                      <h1 className='font-poppins font-bold mb-5 text-[28px]'>Solo Parent Urban Farming</h1>
                      <p className='text-[18px]'>
                          Solo Parent Urban Farming, the name of community farm of Barangay Bagbag. It is currently manage by Mr. Rodel Edroso, a focal 
                          person of Solo Parent Urban Farming. Urban Farming in Bagbag is under the capable management of Mr. Rodel Edroso, who serves as 
                          the focal point for Solo Parent Urban Farming. In collaboration with the Department of Agrarian Reform (DAR), the Quezon City government 
                          has set a visionary goal for the seven-hectare plot in Barangay Bagbag. They aim to transform it into the city's primary vegetable hub, 
                          through an initiative known as "The Seed of Joy of Urban Farming." This project seeks to underscore the importance of urban agriculture, 
                          aiming to alleviate poverty, combat hunger, and enhance food security in marginalized urban communities.
                      </p>
                  </div>
                  <div className='mx-12'>
                        <Image
                          className="lg:block hidden border rounded-lg pt-3"
                          src={SoloParent}
                          alt="Soloparent.png"
                          width={5000}/>
                    </div>
            </div>
            <div className='flex flex-row text-justify my-10'>
                    <div className='mx-12'>
                        <Image
                          className="lg:block hidden rounded-lg pt-3"
                          src={Greenland}
                          alt="Greenland.png"
                          width={3000}/>
                    </div>
                    <div className='mx-12'>
                        <h1 className='font-poppins font-bold mb-5 text-[28px]'>New Greenland Farming</h1>
                        <p className='text-[18px]'>
                          New Greenland Farm, the name of community farm of barangay Barangay Bagong Silangan Quezon City. It is the first urban vegetable farm 
                          under the Buhay sa Gulay initiative of the Department of Agrarian Reform, Department of Agriculture, and the Quezon City Government. 
                          The farm aims to promote urban farming and yielded 700 kilos of veggies in its first harvest.

                        </p>
                    </div>
              </div>
        </div>
      </div> 

      {/* Mission and Vision*/}
      <div className=''> 
          <div className='p-10 bg-[#CFE2CE] '>
          <div id='Head' className='mx-10'>
                  <h3 className='font-livvic font-semibold text-[24px]'>Our</h3>
                  <h2 className='font-livvic font-bold text-[36px]'> Mission & Vision</h2>
              </div>
              <div className='flex flex-row  m-10'>
                <div className='flex flex-row grid-cols-3 mx-10 mt-12 m-10 '>
                    <div id='Image 1' className='mt-16 flex-auto mx-3'> 
                    <Image
                        className="lg:block hidden"
                        src={Image1}
                        alt="image 1.png"
                        width={1000}/>
                    </div>

                    <div id='Image 2' className='justify-items-center'>
                    <Image
                        className="lg:block hidden flex-auto "
                        src={Image2}
                        alt="image 2.png"
                        width={600}/>
                    </div>

                    <div id='Image 3' className='mt-16'>
                    <Image
                        className="lg:block hidden flex-auto mt-16"
                        src={Image3}
                        alt="image 3.png"
                        width={400}/>
                    </div>
                </div>

                <div className=' text-justify mx-10  '>
                    <div id='Vision' className='mb-5'>
                        <h1 className='font-poppins font-bold text-[28px] my-2'>Vision</h1>
                        <p className='text-[18px]'>Our vision is to create a city where every community garden is a flourishing space for urban agriculture. We envision a healthier, 
                          more self-reliant, and environmentally conscious urban environment, where urban farming is not just a trend, but a way of life. Together, 
                          we are sowing the seeds of a more sustainable and nourished future for our city and our planet.
                        </p>
                    </div>
                    <div id='Mission' className=''>
                        <h1 className='font-poppins font-bold text-[28px] my-2'>Mission</h1>
                        <p className='text-[18px]'>At [Your Urban Farm Name], our mission is to transform urban landscapes into thriving hubs of sustainable agriculture. 
                          We are committed to cultivating fresh, locally sourced produce while fostering a sense of community, education, and environmental stewardship.
                          Our goal is to make urban farming accessible to all, creating a greener, healthier, and more resilient city.
                        </p>
                    </div>
                </div>
          </div>
          </div>  

         {/*Members*/}
         <div className='w-full'>
          <div className='mx-10 m-10'>
              <h3 className='font-livvic font-semibold text-[24px]'>Barangay's</h3>
              <h2 className='font-livvic font-bold text-[36px]'>Staff & Chairman</h2>
          </div>
          <div className='flex flex-row grid-cols-3 justify-center '>
              <div className=' border-solid border-2 border-black-600 ... mx-10'>
                  <Image
                          className="lg:block hidden flex-auto "
                          src={Members}
                          alt="Members.png"
                          width={300}/>

                    <div className='pb-3'>
                        <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                        <p className='text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>BAGONG SILANGAN</p>
                        <p className='text-[19px] font-semibold text-center pt-2'> Tiffany D. Lopez</p>
                        <p className='text-[14px] text-center'>Barangay Chairman</p>
                    </div>
              </div>
              <div className=' border-solid border-2 border-black-600 ...'>
                  <Image
                          className="lg:block hidden flex-auto "
                          src={Members}
                          alt="Members.png"
                          width={300}/>

                    <div className='pb-3'>
                    <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                        <p className='text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>BAGBAG</p>
                        <p className='text-[19px] font-semibold text-center pt-2'> Tiffany D. Lopez</p>
                        <p className='text-[14px] text-center'>Barangay Chairman</p>
                    </div>
              </div>
              <div className=' border-solid border-2 border-black-600 ... mx-10'>
                  <Image
                          className="lg:block hidden flex-auto "
                          src={Members}
                          alt="Members.png"
                          width={300}/>

                    <div className='pb-3'>
                        <p className='text-[18px] text-center font-semibold bg-green text-neutral-300 p-3'>NOVA PROPER</p>
                        <p className=' font-semibold text-center text-[19px] pt-2'> Tiffany D. Lopez</p>
                        <p className='text-[14px] text-center '>Barangay Chairman</p>
                    </div>
              </div>    
                                
          </div> 
          <div className='flex justify-center items-center w-full sm:px-[10%] py-5'>

          <Link href="/about/NovaProper"
                className="text-black font-mono font-semibold bg-[#4DE69E] hover:bg-pale w-[160px] mt-10 md:p-3 p-3 border-none rounded-lg text-center">
                Read More
            </Link>
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