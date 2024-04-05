import React from 'react'
import Image from "next/image";
import Footer from '@/app/components/Footer/footer';
import Phone from "/public/images/phone.png";
import Email from "/public/images/email.png";
import Location from "/public/images/location.png";
import Link from "next/link";

function page() {
  return (
    <div className='w-full'>
             {/*Contact Us*/}
      <section
        id="contactus"
        className="lg:flex grid lg:px-20 px-3 border-b border-black justify-between pt-[5%]">
        <div className="lg:w-1/2 w-full p-10 ">
          <h4>CONTACT NOW</h4>
          <h1 className="font-poppins font-bold text-[30px]">
            GET IN TOUCH NOW
          </h1>
          <p className="font-poppins font-normal md:text-[16px] text-[14px]">
            Get in touch with us! Reach out for any inquiries, collaborations,
            or questions. Connect with our team to explore urban farming
            possibilities together.
          </p>
          <div>
            <div className=" flex items-center gap-5 my-10 max-sm:w-8 ">
              <Image src={Phone} alt="Phone icon" />
              <div>
                <h3>PHONE</h3>
                <p className="md:text-[16px] text-[13px]">+639123456789</p>
                <p className="md:text-[16px] text-[13px]">+639987654321</p>
              </div>
            </div>
            <div className="flex items-center gap-5 my-10 max-sm:w-8">
              <Image src={Email} alt="Phone icon" />
              <div>
                <h3>EMAIL</h3>
                <p className="flex md:text-[16px] text-[13px]">
                  agreennatureconnect@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-10 max-sm:w-8">
              <Image src={Location} alt="Location icon" />
              <div>
                <h3>ADDRESS</h3>
                <p className="md:text-[16px] text-[13px]">
                  Brgy. Commonwealth, Quezon City.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-md:hidden lg:w-1/2 w-full sm:p-10 px-1 mb-10">
          <form className="flex flex-col border border-black rounded-lg p-10 shadow-2xl">
            <label
              htmlFor="name"
              className="block text-sm font-poppins font-bold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-1">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <label
              htmlFor="name"
              className="block text-sm font-poppins font-bold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-1">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <label
              htmlFor="message"
              className="block text-sm font-poppins font-bold leading-6 text-gray-900"
            >
              Messsage
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                placeholder=" Your Message"
              />
            </div>
            <button
              type="submit"
              className="bg-amber text-black w-2/5 mt-5 p-2 font-poppins font-bold rounded-xl hover:scale-110 ease-in duration-100 max-md:flex max-md:w-full max-md:justify-center max-md:text-[12px]"
            >
              SUBMIT MESSAGE
            </button>
          </form>
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