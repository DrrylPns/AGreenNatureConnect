import React from 'react'
import Image from "next/image";
import Footer from '@/app/components/Footer/footer';
import LogoContact from "/public/images/logocontact.png";
import Link from "next/link";

function page() {
  return (
    <div className='w-full'>
    {/*Contact Us*/}
      <section id="contactus" className="w-full md:py-24 lg:py-32 py-10 border-b border-black">
        <div className="container grid items-start gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20 md-p-3 p-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                CONTACT US
              </h2>
              <p className="text-gray-500 dark:text-gray-400 md-max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-justify">
                Get in touch with us! Reach out for any inquiries,
                collaborations, or questions. Connect with our team to explore
                urban farming possibilities together.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="md:font-medium">Address</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Brgy. Bagbag, Quezon City.
                </div>
              </div>
              <div className="grid gap-2">
                <div className="md:font-medium">Phone</div>
                <div className="text-gray-500 dark:text-gray-400">
                  (+63) 9123456789 
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                (+63) 9987654321
                </div>
              </div>
              <div className="grid gap-2">
                <div className="md:font-medium">Email</div>
                <div className="text-gray-500 dark:text-gray-400 md:text-[18px] text-[12px]">
                  agreennatureconnect@agreennatureconnect.online 
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden justify-center items-center flex ">
            <Image
              alt="Logo"
              className=" object-fill md:w-[400px] w-[200px] md:h-[400px] h-[200px]"
              src={LogoContact}          
            />
          </div>
        </div>
      </section>
      {/*Footer*/}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default page