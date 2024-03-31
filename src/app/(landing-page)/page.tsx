import Image from "next/image";
import Footer from "../components/Footer/footer";
import Vector from "/public/images/Vector.png";
import Subheading from "/public/images/subheading.png";
import LightIcon from "/public/images/lightbulbIcon.png";
import DeliveryIcon from "/public/images/deliveryIcon.png";
import KnowledgeIcon from "/public/images/knowledgeIcon.png";
import ArrowIcon from "/public/images/arrowRight.png";
import Feature from "/public/images/features.png";
import GrowthIcon from "/public/images/growthIcon.png";
import HealthIcon from "/public/images/healthIcon.png";
import Phone from "/public/images/phone.png";
import Email from "/public/images/email.png";
import Location from "/public/images/location.png";
import Link from "next/link";
import { ShadcnCarousel } from "../(user)/markethub/components/sCarousel";
// import BGBanner from "../../../public/images/bannerbg.png"

export default async function Home() {
  return (
    <div className=" flex-row md:flex-col mx-auto">
      {/*Heading*/}
      
      <header id="home" className="">
      <div 
          className={`h-[100vh] bg-cover bg-center bg-[url('../../../public/images/bannerbg.png')] md:px-20 px-10 flex flex-col justify-center`}
        >
          <div className=" flex flex-col items-end md:w-[600px] w-[600px]">
            
          <div className="font-mono  text-white md:text-[18px] leading-[30px] self-start max-sm:text-[13px] m-2">

              Welcome to AGreen Nature Connect Urban Farming
            </div>
            <Image
              className="flex md:w-[300px] w-[400px] h-[10px] max-sm:hidden mx-60"
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
            
            className="text-black font-poppins font-semibold bg-amber hover:bg-pale w-[160px] md:p-4 p-4 border-none text-center rounded-lg"

          >
            GET STARTED
          </Link>
        </div>
      </header>
      {/*SUBHEADING*/}
      <section className="flex px-16 py-16 items-center gap-8">
        <div className="max-md:py-3 max-md:px-3 lg:px-5 text-justify m-10 ">
          <h1 className="font-livvic font-bold md:text-[44px] text-[20px] max-md:py-3 mb-5">
            Nurtured: Quezon City.
          </h1>
          <p className="md:text-[18px] text-[15px] max-sm:text-[12] ">
            There’s only one thing we love more than plants, and that’s people.
            This is why we’re so proud to be part of the City of Compton. It’s a
            community that demonstrates that, when you create the right
            conditions, flourishing happens naturally.
          </p>
        </div>
        <Image
          className="lg:block hidden "
          src={Subheading}
          alt="subheading image"
          width={500}
        />
      </section>
      {/*ABOUT US*/}
      <section
        id="aboutus"
        className="flex flex-col lg:px-20 px-3 bg-cover bg-center bg-[url('/public/images/about.png')] justify-center items-center border-t-[1px] border-black bg-[#CFE2CE]">
        <div className="w-full h-full from-muted py-20">
          <h1 className="text-center mb-10 font-poppins font-bold md:text-[44px] text-[30px]">
            About Us
          </h1>
          <div className="flex mx-10">   
                <div className="m-5 flex flex-col">
                    <div className="text-justify">
                          <h2 className="font-poppins font-bold text-[32px] mb-8 text-center">
                            Quezon City Urban Farming
                          </h2>
                          <p className="font-poppins font-normal md:text-[18px] text-[15px] mb-5">
                            AGreen Nature Connect, are committed to building a sustainable future by connecting individuals, businesses, and communities to nature. Our website is an information hub and marketplace dedicated to promoting environmental awareness, sustainable practices, and green living.
                          </p>
                          <p className="font-poppins font-normal md:text-[18px] text-[15px] mb-5">
                            We provide comprehensive information, articles, and guides on a wide range of environmental topics, including conservation, renewable energy, eco-friendly lifestyle guidance, and biodiversity preservation.
                          </p>
                          <p className="font-poppins font-normal md:text-[18px] text-[15px] mb-5">
                          Agreen Nature Connect is a marketplace where individuals can discover and support sustainable products from environmentally conscious businesses. 
                          </p>
                          <p className="font-poppins font-normal md:text-[18px] text-[15px]">
                          Our platform encourages community engagement through forums, discussions, and events that bring like-minded individuals together and foster collaboration toward environmental goals.
                          </p>
                    </div>

                    <Link href="/about"
                    className="text-black font-mono font-semibold bg-amber hover:shadow-black hover:bg-pale hover:shadow-md w-[160px] mt-10 md:p-3 p-3 border-none rounded-lg text-center">
                    Read More
                    </Link>
                </div>    
                <div className="m-10 mt-16">
                      <Image
                      className="lg:block hidden mt-9 "
                      src={Subheading}
                      alt="about.png"
                      width={1700}/>
                </div>
          </div>
        </div>
      </section>
      {/*Services*/}
      <section id="services" className="py-5">
        <h1 className="text-center font-poppins font-bold md:text-[44px] text-[30px] mb-5 pt-10">
          Services
        </h1>
        <div className="md:flex grid md:gap-10 gap-3 justify-center items-center pb-20 px-5 py-5">
          <div className="bg-[#CFE2CE] shadow-md shadow-black hover:shadow-black hover:bg-white hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <div className="flex flex-row grid-cols-2 py-3">
                <Image
                  className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
                  src={LightIcon}
                  alt="Light Icon"
                />
                <h3 className="font-poppins font-bold md:text-[22px] text-[15px] px-3">
                  Shares Ideas
                </h3>
            </div>
            <p className="md:text-[16px] text-[12px] font-light my-2">
              Connect with our network to share insights and collaborate on
              cultivating urban agriculture success.
            </p>
            <Link href={"/discussion"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[12px] hover:text-dark-green pt-5">
                SEE MORE
                <Image src={ArrowIcon} alt="Arrow Icon" />
              </button>
            </Link>
          </div>
          <div className="bg-[#CFE2CE] shadow-md shadow-black hover:shadow-black hover:bg-white hover:shadow-lg  rounded-3xl p-5 m-10 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <div className="flex flex-row grid-cols-2 py-3">
                <Image
                  className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
                  src={DeliveryIcon}
                  alt="Delivery icon"
                />
                <h3 className="font-poppins font-bold md:text-[22px] text-[15px] px-3">
                  Order Products
                </h3>
            </div>
            <p className="md:text-[16px] text-[12px] font-light my-2">
              Buy fresh from the farm products. Help local urban farmers to have
              achieve sustainability and efficiency.
            </p>
            <Link href={"/markethub"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[12px] hover:text-dark-green pt-5">
                SEE MORE
                <Image src={ArrowIcon} alt="Arrow Icon" />
              </button>
            </Link>
          </div>
          <div className="bg-[#CFE2CE] shadow-md shadow-black hover:shadow-black hover:bg-white hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <div className="flex flex-row grid-cols-2 py-3">
                <Image
                  className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
                  src={KnowledgeIcon}
                  alt="knowledge Icon"
                />
                <h3 className="font-poppins font-bold md:text-[22px] text-[15px] px-3">
                  Learn Online
                </h3>
            </div>
            <p className="md:text-[15px] text-[12px] font-light my-2">
              Discover the world of urban agriculture with our network. Join us
              in learning and growing together in urban farming.
            </p>
            <Link href={"/learningMaterials"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[13px] hover:text-dark-green pt-5">
                SEE MORE
                <Image src={ArrowIcon} alt="Arrow icon" />
              </button>
            </Link>
          </div>
        </div>
        {/*Features*/}
        <div className="flex bg-muted-green items-center md:h-[100vh] h-[80vh]">
          <Image
            className="md:block hidden"
            src={Feature}
            alt="Feauture Image"
            style={{ width: "50%", height: "100%" }}
          />
          <div className="md:px-20 md:py-15 px-5 py-5 ">
            <h2 className="font-poppins font-bold text-[32px] text-white my-10">
              Providing High Quality Products
            </h2>
            <div className="flex items-center gap-3 my-14">
              <div className=" bg-dark-green p-3 rounded-full">
                <Image src={GrowthIcon} alt="Growth Icon" />
              </div>
              <div className="">
                <h4 className="font-poppins text-[18px] font-semibold text-white">
                  Our Agriculture Growth
                </h4>
                <p className="text-white">
                  Nurture your agricultural growth with us. Explore sustainable
                  practices and maximize your yield potential.
                </p>
              </div>
            </div>
            <div className="border border-pale"></div>
            <div className="flex items-center gap-3 my-14">
              <div className=" bg-dark-green p-3 rounded-full">
                <Image src={HealthIcon} alt="Health Icon" />
              </div>
              <div className="">
                <h4 className="font-poppins text-[18px] font-semibold text-white">
                  Making Healthy Foods
                </h4>
                <p className="text-white">
                  Elevate your food production with premium-quality vegetables
                  and fruits. Cultivate excellence in every harvest with our
                  expertise.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#2D5F4D]">
          <div className="bg-cover bg-center bg-[url('/public/images/discover.png')]">
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
              <Link href={"/markethub"}>
                <button className="px-5 py-3 text-dark-green font-poppins font-medium text-[11px]  bg-[#F7C35F] rounded-xl hover:scale-110 ease-in duration-100 mr-5">
                  DISCOVER MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/*Contact Us*/}
      <section
        id="contactus"
        className="lg:flex grid lg:px-20 px-3 border-b border-black justify-between"
      >
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
  );
}
