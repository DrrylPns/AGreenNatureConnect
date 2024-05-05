import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Sharon from "/public/images/Sharon.png";
import SoloParent from "/public/images/SoloParent.png";
import Greenland from "/public/images/Greenland.png";
import Image1 from "/public/images/image 1.png";
import Image2 from "/public/images/image 2.png";
import Image3 from "/public/images/image 3.png";
import Chairman from "/public/images/BARANGAY CHAIRMAN.png";
import Chairman1 from "/public/images/BARANGAY CHAIRMAN 1.png";
import Chairman2 from "/public/images/BARANGAY CHAIRMAN 2.png";
import Secretary from "/public/images/BARANGAY SECRETARY.png";
import Footer from '@/app/components/Footer/footer';

function page() {
  return (
    <div className=''>
      {/*Header*/}
      <div className={`md:h-[60vh] h-[30vh] bg-cover bg-center bg-[url('../../../public/images/bannerbg.png')] md:px-20 px-10 flex flex-col justify-center`}>
        <h1 className='font-Inter font-mono font-semibold text-center lg:leading-[70px] md:leading-[50px] leading-[30px] text-amber lg:text-[60px] md:text-[40px] text-[32px] md:pt-10 pt-10'>About Us</h1>
      </div>

      {/*About Community*/}
      <div className='p-5 md:px-20 md:my-16'>

        <h2 className='font-livvic font-bold text-center md:mb-10 mb-5 text-[24px] md:text-[36px] uppercase'>Community Farm</h2>
        <div className=''>
          <div className='flex flex-col justify-center gap-2 md:gap-10 md:flex-row text-justify mb-10'>
            <div className='rounded-lg w-full md:w-1/2'>
              <Image
                className="object-cover md:w-full md:h-full "
                src={Sharon}
                alt="Sharon.png"
              />
            </div>
            <div className='flex flex-col  justify-center items-center w-full md:w-1/2'>
              <h1 className='font-poppins font-bold mb-3 text-left text-lg md:text-[28px]'>Sharon Urban Farming</h1>
              <p className='text-[14px] md:text-[18px]'>
                Sharon Urban Farming, the name of community farm of barangay Nova Proper. it is currently manage by Enrique P. Añonuevo,
                a BESWMC Head of Sharon Urban Farming. Sharon Farm, an integrated urban farm situated at the heart of the city, was launched
                last June 2, 2021, with collaborative efforts and partnership between public and private stakeholders. The area owned by the
                Diocese of Novaliches that is approximately 5,500 square meter before the Gulayan sa Siyudad project. This program and movement
                aim to improve the access of urban settlers and disadvantaged groups to safe and nutritious food, promote social inclusion, and
                become an important means for recreation and educational activities for the community.

              </p>
            </div>
          </div>
          <div className='flex flex-col-reverse gap-2 md:gap-10 md:flex-row text-justify mb-5'>
            <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
              <h1 className='font-poppins font-bold mb-3 text-left text-lg md:text-[28px]'>Solo Parent Urban Farming</h1>
              <p className='text-[14px] md:text-[18px]'>
                Solo Parent Urban Farming, the name of community farm of Barangay Bagbag. It is currently manage by Mr. Rodel Edroso, a focal
                person of Solo Parent Urban Farming. Urban Farming in Bagbag is under the capable management of Mr. Rodel Edroso, who serves as
                the focal point for Solo Parent Urban Farming. In collaboration with the Department of Agrarian Reform (DAR), the Quezon City government
                has set a visionary goal for the seven-hectare plot in Barangay Bagbag. They aim to transform it into the city's primary vegetable hub,
                through an initiative known as "The Seed of Joy of Urban Farming." This project seeks to underscore the importance of urban agriculture,
                aiming to alleviate poverty, combat hunger, and enhance food security in marginalized urban communities.
              </p>
            </div>
            <div className='rounded-lg w-full md:w-1/2'>
              <Image
                className="object-cover w-full h-full"
                src={SoloParent}
                alt="Soloparent.png"
                width={400} />
            </div>
          </div>
          <div className='flex flex-col gap-2 md:gap-10 md:flex-row text-justify mb-5'>
            <div className='rounded-lg w-full md:w-1/2'>
              <Image
                className="object-cover w-full h-full"
                src={Greenland}
                alt="Greenland.png"
                width={400} />
            </div>
            <div className='flex flex-col justify-center items-center w-full md:w-1/2'>
              <h1 className='font-poppins font-bold mb-3 text-left text-lg md:text-[28px]'>New Greenland Farming</h1>
              <p className='text-[14px] md:text-[18px]'>
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
        <div className='md:p-10 p-5 bg-[#CFE2CE] '>

          <h2 className='font-livvic font-bold text-[24px] text-center md:text-left md:text-[36px]'>Our Mission & Vision</h2>

          <div className='flex gap-10 mt-5'>
            <div className=' md:flex hidden flex-row md:gap-5 w-1/2'>
              <div id='Image 1' className='mt-28'>
                <Image
                  className=""
                  src={Image1}
                  alt="image 1.png"
                  width={1000} />
              </div>

              <div id='Image 2' className='mt-10'>
                <Image
                  className=""
                  src={Image2}
                  alt="image 2.png"
                  width={600} />
              </div>

              <div id='Image 3' className='lg:block hidden mt-36'>
                <Image
                  className=""
                  src={Image3}
                  alt="image 3.png"
                  width={400} />
              </div>
            </div>
            <div className='flex flex-col gap-10 w-full md:w-2/3'>
              <div id='Vision' className=''>
                <h1 className='font-poppins font-bold md:text-[28px] text-lg my-2'>Vision</h1>
                <p className='md:text-[18px] text-[14px] text-justify'>Our vision is to create a city where every community garden is a flourishing space for urban agriculture. We envision a healthier,
                  more self-reliant, and environmentally conscious urban environment, where urban farming is not just a trend, but a way of life. Together,
                  we are sowing the seeds of a more sustainable and nourished future for our city and our planet.
                </p>
              </div>
              <div id='Mission' className=''>
                <h1 className='font-poppins font-bold md:text-[28px] text-lg my-2'>Mission</h1>
                <p className='md:text-[18px] text-[14px] text-justify'>At Agreen Nature Connect, our mission is to transform urban landscapes into thriving hubs of sustainable agriculture.
                  We are committed to cultivating fresh, locally sourced produce while fostering a sense of community, education, and environmental stewardship.
                  Our goal is to make urban farming accessible to all, creating a greener, healthier, and more resilient city.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Members*/}
        <div className='w-full md:p-20 p-3'>
          <div className='md:mx-10 mx-3 md:m-10 m-3  '>
            <h3 className='font-livvic font-semibold md:text-[24px] text-[15px]'>Barangay's</h3>
            <h2 className='font-livvic font-bold md:text-[36px] text-[24px]'>Staff & Chairman</h2>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 md:gap-5 gap-3 md:px-20'>
            <div className=' border-solid border-2 border-gray-500 md:w-[250px] sm:w-[180px] '>
              <Image
                className="w-full"
                src={Chairman}
                alt="BARANGAY CHAIRMAN.png"
                 />

              <div className='pb-3'>
                <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                <p className='text-sm md:text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>BAGONG BAGBAG</p>
                <p className='md:text-[19px] text-[16px] font-semibold text-center pt-2'> Richard V. Ambita, MPA.</p>
                <p className='text-[14px] text-center'>Barangay Chairman</p>
              </div>
            </div>
            <div className=' border-solid border-2 border-gray-500 md:w-[250px] sm:w-[180px]'>
              <Image
                className="w-full"
                src={Chairman1}
                alt="BARANGAY CHAIRMAN 1.png"
                 />

              <div className='pb-3'>
                <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                <p className='text-sm md:text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>NOVA PROPER</p>
                <p className='md:text-[19px] text-[16px] font-semibold text-center pt-2'> Asuncion M. Visaya</p>
                <p className='text-[14px] text-center'>Barangay Chairwoman</p>
              </div>
            </div>
            <div className=' border-solid border-2 border-gray-500 md:w-[250px] sm:w-[180px]'>
              <Image
                className="w-full "
                src={Chairman2}
                alt="BARANGAY CHAIRMAN 2.png"
                 />

              <div className='pb-3'>
                <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                <p className='text-sm md:text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>BAGONG SILANGAN</p>
                <p className='md:text-[19px] text-[16px] font-semibold text-center pt-2'> Wilfredo L. Cara </p>
                <p className='text-[14px] text-center '>Barangay Chairman</p>
              </div>
            </div>
            <div className=' border-solid border-2 border-gray-500 md:w-[250px] sm:w-[180px]'>
              <Image
                className="w-full "
                src={Secretary}
                alt="BARANGAY SECRETARY.png"
                />

              <div className='pb-3'>
                <p className='text-[14px] text-center font-semibold bg-green text-neutral-300 pt-1'>BARANGAY</p>
                <p className='text-sm md:text-[16px] text-center font-semibold bg-green text-neutral-300 pb-1'>BAGBAG</p>
                <p className='md:text-[19px] text-[16px] font-semibold text-center pt-2'> Ronaldo V. Pascor </p>
                <p className='text-[14px] text-center '>Barangay Secretary</p>
              </div>
            </div>

          </div>
          <div className='flex justify-center items-center w-full sm:px-[10%] md:py-5'>

            <Link href="/about/NovaProper"
              className="text-black font-mono font-semibold bg-amber hover:bg-pale w-[160px] md:mt-10 mt-5 md:p-3 p-3 border-none rounded-lg text-center">
              Read More
            </Link>
          </div>
        </div>
      </div>

      <div className='w-full bg-[#CFE2CE] p-5 md:px-10'>
        <div className='w-full mx-auto md:w-3/4 p-5 md:p-10 md:flex flex md:flex-row flex-col md:justify-center md:gap-8 shadow-sm shadow-black rounded-3xl bg-white'>
          <div className='md:w-1/2'>
            <h1 className='font-poppins font-bold text-lg md:text-[24px] mb-1 md:mb-3'>Still have a questions?</h1>
            <p className='text-sm md:text-[16px]'>Couldn’t find what you needed,our friendly support team is here to help.</p>
          </div>
          <div className='md:w-[30%] flex flex-col justify-center text-black text-xs md:text-lg font-mono font-semibold text-center pt-2'>
            <Link href={"/about/Contact"}
              className="  bg-amber  hover:bg-pale py-2 px-3 md:w-[160px] border-none rounded-lg ">
              Get in Touch
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