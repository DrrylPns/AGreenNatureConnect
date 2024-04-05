import React from 'react'
import Image from "next/image";
import Tutorial from "/public/images/tutorial 1.png";
import Account from "/public/images/account 1.png";
import Page from "/public/images/web-page 1.png";
import Store from "/public/images/store 1.png";
import Padlock from "/public/images/padlock 1.png";
import Search from "/public/images/search-Icon.png";
import Icon from "/public/images/Icon-help.png";
import Link from "next/link";
import Footer from '@/app/components/Footer/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function page() {
  return (
    <div className='w-full'>
{/*Heading*/}
        <div className='pt-[5%] bg-[#B9DEB7]'>

          <div className='p-10 bg-[#B9DEB7] flex flex-row grid-cols-2 gap-40'>

              <div className='px-10 pt-10 '>
                <h1 className='font-bold lg:text-[36px] md:text-[32px] text-[36xpx] '>How can we help you today?</h1>
                <p className=' font-livvic lg:text-[18px] md:text-[16px] text-[18px] py-5'>Welcome to AGreen Nature Connect’s Help Center</p>


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
                  <Link href={"/markethub"} className="bg-[#B9DEB7] shadow-md shadow-black hover:shadow-black hover:bg-[#F0F0F0] hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
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
            <div className=''>
              <h1 className='font-livvic font-bold text-[36px]'>Frequently Asked Questions</h1>
            </div>

          <Accordion type="single" collapsible className="w-full p-10 px-20 text-[18px]  ">
              <AccordionItem value="item-1" className=''>
                  <AccordionTrigger className='font-livvic'>Can I change my username?</AccordionTrigger>
                      <AccordionContent className='text-[16px] font-extralight'>
                        No Data Input
                      </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                  <AccordionTrigger className='font-livvic'>How do I log in if I forgot my password?</AccordionTrigger>
                      <AccordionContent className='text-[17px] font-extralight'>
                      <p className='p-2'><span className='font-medium'>1. Visit the Login Page:</span> Go to the login page.</p>

                      <p className='p-2'><span className='font-medium '>2. Click on "Forgot Password" or Similar:</span> Look for a link or button that says something like "Forgot your password?" or "Can't access your account?" Click on it.</p>

                      <p className='p-2'><span className='font-medium '>3. Enter Your Email or Username:</span> You'll typically be asked to enter the email address or username associated with your account. This is usually the primary way to identify your account.</p>

                      <p className='p-2'><span className='font-medium '>4.  Follow the Instructions:</span> After entering your email or username, the platform will usually send you instructions on how to reset your password. This might involve receiving a link via email or text message, answering security questions, or providing other verification details.</p>

                      <p className='p-2'><span className='font-medium '>5.  Reset Your Password:</span> Once you receive the instructions, follow them to reset your password. You'll typically be asked to choose a new password and confirm it.</p>

                      <p className='p-2'><span className='font-medium '>6. Log In with Your New Password:</span> After successfully resetting your password, you should be able to log in to your account using your new password.</p>

                      <p className='p-2'>If you're having trouble resetting your password or accessing your account, you can call our customer support for further assistance. We can help you regain access to your account and troubleshoot any issues you're experiencing.</p>


                      </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                  <AccordionTrigger className='font-livvic'>How do I permanently delete my account?</AccordionTrigger>
                    <AccordionContent className='text-[16px] font-extralight'>
                    No Data Input
                    </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                  <AccordionTrigger className='font-livvic'>Are there age restrictions for using AGreen Nature Connect?</AccordionTrigger>
                    <AccordionContent className='text-[16px] font-extralight'>
                    No Data Input
                    </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                  <AccordionTrigger className='font-livvic'>How do I report a bug or provide feedback?</AccordionTrigger>
                    <AccordionContent className='text-[16px] font-extralight'>
                    No Data Input
                    </AccordionContent>
              </AccordionItem>
          </Accordion>
            
        </div>

        


{/*InTouch*/}
<div className='w-full bg-[#B9DEB7] justify-center p-10 '>
      <div className='flex flex-row justify-center mx-60 p-10 shadow-sm shadow-black rounded-3xl bg-white'>
          <div className='px-5'>
              <h1 className='font-poppins font-bold text-[24px] pb-3'>Still have a questions?</h1>
              <p className='text-[16px]'>Couldn’t find what you needed,our friendly support team is here to help.</p>
            </div>
            <div className='mt-7 px-10'>
              <Link href="/about/Contact"
              className=" text-black font-mono font-semibold bg-amber hover:bg-pale w-[160px] mt-10 md:p-3 p-3 border-none rounded-full text-center">
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