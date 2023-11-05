import Footer from "@/app/components/Footer/footer"
import Image from "next/image";
import Phone from "/public/images/phone.png";
import Email from "/public/images/email.png";
import Location from "/public/images/location.png";
"/public/images/member2.png"

export default function About() {
  return (
    <div>
        {/*Img Header*/}
        <header id="about">
            <div className={`h-[60vh] bg-cover bg-center bg-[url('../../../public/images/bannerbg.png')] md:px-20 px-5 mt-5 flex flex-col justify-center`}>
                <h1 className="font-livvic font-bold text-[#F7C35F] text-center md:leading-[50px] leading-[30px lg:text-[50px] md:text-[40px] max-sm:text-[23px] text-[18px]">
                    About Us
                </h1>
            </div>
            
        </header>
        {/*Community Farm*/}
        <section id="comfarm1" className=" max-md:p-2 max-md:pl-2 max-md:pr-2 py-10">
                <h4 className="font-livvic font-semibold md:text-[24px] text-[18px] px-12">
                    About the
                </h4>
                <h2 className="font-livvic px-10 font-bold md:text-[45px] text-[30px] pb-10">
                    Community Farm
                </h2>
            <div className="flex text-justify pb-10 pt-10 ">
                <div className="lg:block hidden px-10">
                    <Image
                        src={"About_img1.svg"}
                        alt="About_img"
                        width={6000}
                        height={400}
                    />
                </div>
                <div className="px-10">
                    <h2 className="font-livvic font-bold text-[32px] pt-5 pb-10 text-black max-lg:text-[40] max-md:text-[30] max-sm-[20px] ">
                        Solo Parent Urban Farming
                    </h2>
                    <p className="font-medium max-md:text-[12px] max-sm:text-[10px]">
                    Solo Parent Urban Farming, the name of community farm of Barangay Bagbag. It is currently manage by Mr. Rodel Edroso, 
                    a focal person of Solo Parent Urban Farming. Urban Farming in Bagbag is under the capable management of Mr. Rodel Edroso, 
                    who serves as the focal point for Solo Parent Urban Farming. In collaboration with the Department of Agrarian Reform (DAR), 
                    the Quezon City government has set a visionary goal for the seven-hectare plot in Barangay Bagbag. They aim to transform it 
                    into the city's primary vegetable hub, through an initiative known as "The Seed of Joy of Urban Farming." This project seeks 
                    to underscore the importance of urban agriculture, aiming to alleviate poverty, combat hunger, and enhance food security in 
                    marginalized urban communities.
                    </p>
                </div>
            </div> 
            <div className="flex text-justify">
                <div className="px-10">
                    <h2 className="font-livvic font-bold text-[32px] pt-5 pb-10 text-black max-lg:text-[40] max-md:text-[30] max-sm-[20px]">
                        Solo Parent Urban Farming                    
                    </h2>
                    <p className="font-medium max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px]">
                    Solo Parent Urban Farming, the name of community farm of Barangay Bagbag. It is currently manage by Mr. Rodel Edroso, a focal
                     person of Solo Parent Urban Farming. Urban Farming in Bagbag is under the capable management of Mr. Rodel Edroso, who serves 
                     as the focal point for Solo Parent Urban Farming. In collaboration with the Department of Agrarian Reform (DAR), the Quezon 
                     City government has set a visionary goal for the seven-hectare plot in Barangay Bagbag. They aim to transform it into the 
                     city's primary vegetable hub, through an initiative known as "The Seed of Joy of Urban Farming." This project seeks to 
                     underscore the importance of urban agriculture, aiming to alleviate poverty, combat hunger, and enhance food security in 
                     marginalized urban communities.
                    </p>
                </div>
                <div className="lg:block hidden px-10">  
                    <Image
                        src={"About_img1.svg"}
                        alt="About_img"
                        width={6000}
                         height={400}
                    />
                </div>
            </div>
        </section>

        {/*Mission and Vision*/}
        <section id="mvision" className="max-md:pl-2 max-md:pr-2 bg-[#CFE2CE] py-10 pb-20">
        <h4 className="font-livvic font-semibold md:text-[24px] text-[18px] px-12">
                    Our
                </h4>
                <h2 className="font-livvic px-10 font-bold md:text-[45px] text-[30px] pb-5">
                    Mission & Vision
                </h2>
            <div className="h-500 grid grid-cols-2 gap-4 content-normal px-10">
            <div className="flex flex-row  gap-4 content-normal justify-center pt-2">
                <div className="lg:block hidden pt-44">
                    <Image
                        src={"About_img2.svg"}
                        alt="About_img"
                        width={250}
                        height={250}
                    />
                </div>

                <div className="lg:block hidden pt-20">
                    <Image
                        src={"About_img3.svg"}
                        alt="About_img"
                        width={180}
                        height={180}
                    />
                </div>

                <div className="lg:block hidden pt-56">
                    <Image
                        src={"About_img4.svg"}
                        alt="About_img"
                        width={100}
                        height={100}
                    />
                </div>    

            </div>
            <div className="grid grid-row-2 gap-4 content-normal px-10">
                <div className="py-5">
                    <h2 className="font-livvic font-bold text-[32px] pt-5 pb-5 text-black max-lg:text-[40] max-md:text-[30] max-sm-[20px]">
                        Vision                   
                    </h2>
                    <p className="font-medium max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px] text-justify">
                    Our vision is to create a city where every community garden is a flourishing space for urban agriculture. We envision a
                    healthier, more self-reliant, and environmentally conscious urban environment, where urban farming is not just a trend, 
                    but a way of life. Together, we are sowing the seeds of a more sustainable and nourished future for our city and our planet.
                    </p>
                </div>

                <div>
                    <h2 className="font-livvic font-bold text-[32px] pt-5 pb-5 text-black max-lg:text-[40] max-md:text-[30] max-sm-[20px]">
                        Mission                   
                    </h2>
                    <p className="font-medium max-lg:text-[14px] max-md:text-[12px] max-sm:text-[10px] text-justify">
                    At [Your Urban Farm Name], our mission is to transform urban landscapes into thriving hubs of sustainable agriculture. We are
                    committed to cultivating fresh, locally sourced produce while fostering a sense of community, education, and environmental 
                    stewardship. Our goal is to make urban farming accessible to all, creating a greener, healthier, and more resilient city.
                    </p>
                </div>
             </div>

            </div>
        </section>

        {/*Members*/}
        <section className="py-10">
            <h4 className="font-livvic font-semibold md:text-[24px] text-[18px] px-12">
                Our
            </h4>
            <h2 className="font-livvic px-10 font-bold md:text-[45px] text-[30px] pb-5">
                Members
            </h2>

            <div className="h-70 grid grid-row-3 gap-4 content-normal py-10">
                <div className="flex flex-row  gap-4 content-normal justify-center pt-2 ">   
                    <div className="h-400 px-5 bg-[#F0F0F0]">
                        <Image
                            src={"/images/member2.png"}
                            alt="member2.png"
                            width={200}
                            height={150}
                        />
                        <div className="text-[12px] py-3 ">
                            <p><span className="font-bold">Name:</span> Mondey D. Luffy</p>
                            <p><span className="font-bold">Position:</span> Captian of the Pirate Crew</p>
                        </div>
                    </div>
                    <div className="h-400 px-5 bg-[#F0F0F0]">
                        <Image
                            src={"/images/member2.png"}
                            alt="member2.png"
                            width={200}
                            height={150}
                        />
                        <div className="text-[12px] py-3 ">
                            <p><span className="font-bold">Name:</span> Mondey D. Luffy</p>
                            <p><span className="font-bold">Position:</span> Captian of the Pirate Crew</p>
                        </div>
                    </div>
                    <div className="h-400 px-5 bg-[#F0F0F0]">
                        <Image
                            src={"/images/member2.png"}
                            alt="member2.png"
                            width={200}
                            height={150}
                        />
                        <div className="text-[12px] py-3 ">
                            <p><span className="font-bold">Name:</span> Mondey D. Luffy</p>
                            <p><span className="font-bold">Position:</span> Captian of the Pirate Crew</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*Contact Us*/}
        <section
        id="contactus"
        className="lg:flex grid lg:px-20 px-3 border-b border-black justify-between bg-[#F0F0F0]" 
      >
        <div className="lg:w-1/2 w-full p-10 ">
          <h4>CONTACT NOW</h4>
          <h1 className="font-poppins font-bold text-[30px]">
            GET IN TOUCH NOW
          </h1>
          <p className="font-poppins font-normal md:text-[16px] text-[15px]">
            Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse platea
            dictumst. Duis porta,quam ut finibus ultrices.
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
                <p className="md:text-[16px] text-[13px]">Brgy. Commonwealth, Quezon City.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full sm:p-10 px-1 mb-10">
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
              className="bg-amber text-black w-2/5 mt-5 p-2 font-poppins font-bold rounded-xl hover:scale-110 ease-in duration-100 max-md:flex max-md:w-full max-md:justify-center sm:text-sm"
            >
              SUBMIT MESSAGE
            </button>
          </form>
        </div>
      </section>

        <div>
        <Footer/>
        </div>
        
    </div>
  )
}
