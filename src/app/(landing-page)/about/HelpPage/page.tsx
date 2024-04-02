import React from 'react'
import Image from "next/image";
import ArrowIcon from "/public/images/arrowRight.png";
import Tutorial from "/public/images/tutorial 1.png";
import Account from "/public/images/account1.png";
import Page from "/public/images/web-page 1.png";
import Store from "/public/images/store 1.png";
import Padlock from "/public/images/padlock 1.png";
import Search from "/public/images/search-Icon.png";
import Icon from "/public/images/Icon-help.png";
import Link from "next/link";
import Footer from '@/app/components/Footer/footer';

function page() {
  return (
    <div className='w-full'>
{/*Heading*/}
        <div className='pt-[5%] bg-[#B9DEB7]'>

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


{/*Services*/}
        <div className='p-10'>
            <div className=''>
              <h1 className='font-livvic font-bold text-[36px]'>Browse All Topics</h1>
            </div>

            <div className='w-full'>
              <div className='flex flex-row grid-cols-3 gap-20 p-10 justify-center'>
                  <Link href={"/discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Account}
                              alt="account1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Getting Started
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light px-3">
                          Basic of how to use AGreen Nature Connect.
                        </p>                    
                  </Link>

                  <Link href={"discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Tutorial}
                              alt="Tutorial 1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Account Settings
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light px-3">
                            Learn about name changes, adjust settings, manage notifications and more.
                        </p>
                      
                      
                  </Link>

                  <Link href={"discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Page}
                              alt="web-page 1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Interfaces
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light  px-3">
                           Basic of how to use AGreen Nature Connect
                        </p>
                  </Link>
              </div>

              <div className='flex flex-row grid-cols-3 gap-20 p-10 justify-center'>
                  <Link href={"discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Store}
                              alt="store 1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Marketplace
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light px-3">
                           Learn how to buy and sell on AGreen Nature Connect.
                        </p>
                  </Link>


                  <Link href={"discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Padlock}
                              alt="padlock 1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Privacy and Security
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light px-3">
                            Instructions on how to manage the privacy and security of your account and data
                        </p>
                  </Link>


                  <Link href={"discussion"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
                        <div className="text-center pt-3">
                            <div className='w-full flex justify-center'><Image
                              className="sm:h-[80px] h-[50px] sm:w-[80px] w-[50px]"
                              src={Page}
                              alt="web-page 1"/>
                            </div>

                            <h3 className="font-poppins font-bold md:text-[20px] text-[13px] p-3">
                              Send Feedback
                            </h3>
                        </div>
                        <p className="md:text-[16px] text-[12px] font-light px-3">
                          Connect with our network to share insights and collaborate on
                          cultivating urban agriculture success.
                        </p>
                  </Link>

              </div>  
        </div>
    </div>


{/*FAQ's*/}
        <div className='p-10'>
            <div className='pb-10'>
              <h1 className='font-livvic font-bold text-[36px]'>Frequently Asked Questions</h1>
            </div>

            <div className='w-full flex flex-col gap-5 px-32 pb-5'>
                <div className='shadow-md shadow-black border-2 rounded-xl bg-[#B9DEB7]'>
                    <h1 className='p-5 font-poppins font-normal md:text-[18px] text-[15px]'>Can I change my username?</h1>
                </div>

                <div className='shadow-md shadow-black border-2 rounded-xl'>
                    <h1 className='p-5 font-poppins font-normal md:text-[18px] text-[15px] bg-[#B9DEB7]'>How do I log in if I forgot my password?</h1>
                </div>

                <div className='shadow-md shadow-black border-2 rounded-xl'>
                   <h1 className='p-5 font-poppins font-normal md:text-[18px] text-[15px] bg-[#B9DEB7]'>How do I permanently delete my account?</h1>
                </div>

                <div className='shadow-md shadow-black border-2 rounded-xl'>
                    <h1 className='p-5 font-poppins font-normal md:text-[18px] text-[15px] bg-[#B9DEB7]'>Are there age restrictions for using AGreen Nature Connect?</h1>
                </div>

                <div className='shadow-md shadow-black border-2 rounded-xl'>
                  <h1 className='p-5 font-poppins font-normal md:text-[18px] text-[15px] bg-[#B9DEB7]'>How do I report a bug or provide feedback?</h1>
                </div>  
            </div>
        </div>


{/*InTouch*/}
<div className='w-full bg-[#CFE2CE] justify-center p-10 '>
      <div className='flex flex-row  gap-32 justify-center mx-64 p-10 shadow-sm shadow-black rounded-3xl bg-white'>
          <div className='px-5'>
              <h1 className='font-poppins font-bold text-[24px] pb-3'>Still have a questions?</h1>
              <p className='text-[16px]'>Couldn’t find what you needed,our friendly support team is here to help.</p>
            </div>
            <div className='mt-7 px-10'>
              <Link href="/about/HelpPage"
              className=" text-black font-mono font-semibold bg-[#4DE69E] hover:bg-pale w-[160px] mt-10 md:p-3 p-3 border-none rounded-full text-center">
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