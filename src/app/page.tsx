import Image from "next/image";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Leaf from "../../public//images/leaf.png";
import Vector from "../../public/images/Vector.png";
import Subheading from "../../public//images/subheading.png";
import LightIcon from "../../public//images/lightbulbIcon.png";
import DeliveryIcon from "../../public//images/deliveryIcon.png";
import KnowledgeIcon from "../../public//images/knowledgeIcon.png";
import ArrowIcon from "../../public//images/arrowRight.png";
import Feature from "../../public//images/features.png";
import GrowthIcon from "../../public//images/growthIcon.png";
import HealthIcon from "../../public//images/healthIcon.png";
import Phone from "../../public//images/phone.png";
import Email from "../../public//images/email.png";
import Location from "../../public//images/location.png";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex-row md:flex-col mx-auto">
      {/*Heading*/}
      <Navbar />
      <header id="home" className="">
        <div className=" h-[100vh] bg-cover bg-center bg-[url('../../public/images/bannerbg.png')] md:px-20 px-10 flex flex-col justify-center">
          <div className=" flex flex-col items-end md:w-[320px] w-[300px]">
            <div className="font-poppins font-bold text-white md:text-[17.5px] leading-[30px] self-start">
              Welcome to New Green Land Farming
            </div>
            <Image
              className="md:w-[200px] w-[200px] h-[10px]"
              src={Vector}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full items-end mt-5">
            <h1 className="font-livvic font-bold lg:leading-[70px] md:leading-[50px] leading-[30px] text-amber lg:text-[50px] md:text-[40px] text-[20px] self-start mt-[-20px]">
              Urban Farming Matter
            </h1>
            <h1 className="font-livvic font-bold lg:leading-[70px] md:leading-[50px] leading-[30px] text-white lg:text-[50px] md:text-[40px] text-[20px] self-start">
              Good production
            </h1>
          </div>
          <p className="my-[20px] text-white font-poppins text-[15px]">
            Greens in the Streets: Farming for a Better Tomorrow
          </p>
          <Link
            href="/discussion"
            className="text-black font-poppins font-semibold bg-amber hover:bg-pale w-[160px] md:p-4 p-4 border-none rounded-lg"
          >
            GET STARTED
          </Link>
        </div>
      </header>
      {/*SUBHEADING*/}
      <section className="flex px-20 py-10 items-center gap-8 bg-gradient-to-b from-semi-transparent-greenish to-transparent">
        <div>
          <h1 className="font-livvic font-bold md:text-[40px] text-[20px]">
            Nurtured
          </h1>
          <h1 className="font-livvic font-bold md:text-[40px] text-[20px]">
            By Quezon City.
          </h1>
          <p className="md:text-[15px] text-[10px]">
            There’s only one thing we love more than plants, and that’s people.
            This is why we’re so proud to be part of the City of Compton. It’s a
            community that demonstrates that, when you create the right
            conditions, flourishing happens naturally.
          </p>
        </div>
        <Image
          className="lg:block hidden"
          src={Subheading}
          alt="subheading image"
          width={600}
        />
      </section>
      {/*ABOUT US*/}
      <section
        id="aboutus"
        className="flex flex-col bg-cover bg-center bg-[url('../../public/images/about.png')] justify-center items-center border-t-[1px] border-black"
      >
        <div className="w-full h-full py-10 bg-gradient-to-b from-muted to-pale">
          <h1 className="text-center mb-10 font-poppins font-bold md:text-[40px] text-[30px]">
            About Us
          </h1>
          <div className="w-full mb-5">
            <div className="lg:w-[40%] sm:w-[50%] w-[70%]  rounded-r-full p-10 pr-15 bg-muted-green hover:scale-125 hover:translate-x-16 ease-in-out duration-500">
              <h3 className="font-livvic font-bold md:text-[25px] text-[20px] text-amber">
                Vision
              </h3>
              <p className="font-poppins text-white md:text-[15px] text-[10px] text-justify">
                Our vision is to create a city where every community garden is a
                flourishing space for urban agriculture. We envision a
                healthier, more self-reliant, and environmentally conscious
                urban environment, where urban farming is not just a trend, but
                a way of life. Together, we are sowing the seeds of a more
                sustainable and nourished future for our city and our planet.
              </p>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="lg:w-[40%] sm:w-[50%] w-[70%] rounded-l-full p-10 pl-20 bg-muted-green hover:scale-125 hover:translate-x-[-4rem] ease-in-out duration-500">
              <h3 className="font-livvic font-bold md:text-[25px] text-[20px] text-amber">
                Mission
              </h3>
              <p className="font-poppins text-white md:text-[15px] text-[10px] text-justify">
                Our vision is to create a city where every community garden is a
                flourishing space for urban agriculture. We envision a
                healthier, more self-reliant, and environmentally conscious
                urban environment, where urban farming is not just a trend, but
                a way of life. Together, we are sowing the seeds of a more
                sustainable and nourished future for our city and our planet.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/*Services*/}
      <section id="services" className="pt-10">
        <h1 className="text-center font-poppins font-bold md:text-[40px] text-[30px] mb-10">
          Services
        </h1>
        <div className="flex md:gap-10 gap-3 justify-center items-center pb-20 px-1">
          <div className="bg-pale border-4 border-black rounded-3xl p-5 md:w-1/5 w-1/3  hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <Image
              className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
              src={LightIcon}
              alt="Light Icon"
            />
            <h3 className="font-poppins font-bold md:text-[20px] text-[15px]">
              Shares Ideas
            </h3>
            <p className="md:text-[12px] text-[10px] font-semibold my-2">
              Are you a farmer looking to grow your business? Reach new
              customers when you join our network.
            </p>
            <button className="flex gap-2 font-poppins font-bold md:text-[15px] text-[12px] hover:text-dark-green">
              SEE MORE
              <Image src={ArrowIcon} alt="Arrow Icon" />
            </button>
          </div>
          <div className="bg-pale border-4 border-black rounded-3xl p-5 md:w-1/5 w-1/3 hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <Image
              className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
              src={DeliveryIcon}
              alt="Delivery icon"
            />
            <h3 className="font-poppins font-bold md:text-[20px] text-[15px]">
              Order Products
            </h3>
            <p className="md:text-[12px] text-[10px] font-semibold my-2">
              Buy fresh from the farm products. Help local urban farmers to have
              achieve sustainability and efficiency.
            </p>
            <button className="flex gap-2 font-poppins font-bold md:text-[15px] text-[12px]  ">
              SEE MORE
              <Image src={ArrowIcon} alt="Arrow Icon" />
            </button>
          </div>
          <div className="bg-pale border-4 border-black rounded-3xl p-5 md:w-1/5 w-1/3 hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <Image
              className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
              src={KnowledgeIcon}
              alt="knowledge Icon"
            />
            <h3 className="font-poppins font-bold md:text-[20px] text-[15px]">
              Learn Online
            </h3>
            <p className="md:text-[12px] text-[10px] font-semibold my-2">
              Buy fresh from the farm products. Help local urban farmers to have
              achieve sustainability and efficiency.
            </p>
            <button className="flex gap-2 font-poppins font-bold md:text-[15px] text-[12px]">
              SEE MORE
              <Image src={ArrowIcon} alt="Arrow icon" />
            </button>
          </div>
        </div>
        {/*Features*/}
        <div className="flex bg-muted-green items-center h-[100vh]">
          <Image
            className="md:block hidden"
            src={Feature}
            alt="Feauture Image"
            style={{ width: "50%", height: "100%" }}
          />
          <div className="md:px-20 md:py-15 px-5 py-5 ">
            <h2 className="font-poppins font-bold text-[30px] text-white my-10">
              Providing High Quality Products
            </h2>
            <div className="flex items-center gap-3 my-14">
              <div className=" bg-dark-green p-3 rounded-full">
                <Image src={GrowthIcon} alt="Growth Icon" />
              </div>
              <div className="">
                <h4 className="font-poppins font-semibold text-white">
                  Our Agriculture Growth
                </h4>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus
                  arcu. Metus elit auctor
                </p>
              </div>
            </div>
            <div className="border border-pale"></div>
            <div className="flex items-center gap-3 my-14">
              <div className=" bg-dark-green p-3 rounded-full">
                <Image src={HealthIcon} alt="Health Icon" />
              </div>
              <div className="">
                <h4 className="font-poppins font-semibold text-white">
                  Making Healthy Foods
                </h4>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur. Cursus purus at tempus
                  arcu. Metus elit auctor
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2D5F4D]">
          <div className="bg-cover bg-center bg-[url('../../public/images/discover.png')]">
            <div className="bg-gradient-to-r from-[#F7C35FCC] to-[#F7C32929] w-full flex justify-between items-center gap-10 sm:px-40 px-35 py-14">
              <div className="flex items-center gap-5">
                <div className="ml-5 bg-dark-green p-3 rounded-full">
                  <Image src={GrowthIcon} alt="Growth Icon" />
                </div>
                {/*The font style doesn't work */}
                <h1 className="font-dancing-script font-normal md:text-2xl text-lg text-dark-green">
                  We are Leader in Urban Farming Market
                </h1>
              </div>
              <button className="px-5 py-3 text-dark-green font-poppins font-medium text-[11px]  bg-[#F7C35F] rounded-xl hover:scale-110 ease-in duration-100 mr-5">
                DISCOVER MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      {/*Contact Us*/}
      <section
        id="contactus"
        className="lg:flex grid px-20 border-b border-black w-full justify-between"
      >
        <div className="lg:w-1/2 w-full p-10  ">
          <h4>CONTACT NOW</h4>
          <h1 className="font-poppins font-bold text-[30px]">
            GET IN TOUCH NOW
          </h1>
          <p className="font-poppins font-normal text-[15px]">
            Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse platea
            dictumst. Duis porta,quam ut finibus ultrices.
          </p>
          <div>
            <div className="flex items-center gap-10 my-10">
              <Image src={Phone} alt="Phone icon" />
              <div>
                <h3>PHONE</h3>
                <p>+639123456789</p>
                <p>+639987654321</p>
              </div>
            </div>
            <div className="flex items-center gap-10 my-10">
              <Image src={Email} alt="Phone icon" />
              <div>
                <h3>EMAIL</h3>
                <p>agreennatureconnect@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-10 my-10">
              <Image src={Location} alt="Location icon" />
              <div>
                <h3>ADDRESS</h3>
                <p>Brgy. Commonwealth, Quezon City.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full p-10">
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
              />
            </div>
            <button
              type="submit"
              className="bg-amber text-black w-2/5 mt-5 px-2 py-2 font-poppins font-bold rounded-xl hover:scale-110 ease-in duration-100"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>
      {/*Footer*/}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
