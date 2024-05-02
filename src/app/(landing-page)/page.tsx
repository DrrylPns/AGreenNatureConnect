import Image from "next/image";
import Footer from "../components/Footer/footer";
import Vector from "/public/images/Vector.png";
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
// import BGBanner from "../../../public/images/bannerbg.png"

export default function Home() {
  return (
    <div className=" flex-row md:flex-col mx-auto">
      {/*Heading*/}

      <header id="home" className="">
        <div
          className={`lg:h-[85vh] md:h-[80vh] h-[100vh] bg-cover bg-center bg-[url('../../../public/images/bannerbg.png')] md:px-20 px-5 flex flex-col justify-center`}
        >
          <div className="flex flex-col items-end md:w-[600px] w-[300px]">
            <div className="font-poppins text-white  md:text-[18px] sm:text-[16px] text-[14px] self-start md:pb-0 pb-2 ">
              Welcome to AGreen Nature Connect Urban Farming
            </div>
            <Image
              className="flex md:w-[300px] w-[100px] h-[10px] max-sm:hidden mx-60"
              src={Vector}
              alt=""
            />
          </div>
          <div className="flex flex-col w-full items-end mt-5">
            <h1 className=" font-poppins font-bold lg:leading-[70px] md:leading-[50px] leading-[30px] text-amber lg:text-[50px] md:text-[40px] text-[24px] self-start mt-[-20px]">
              Urban Farming Matter
            </h1>
            <h1 className="font-poppins font-bold lg:leading-[70px] md:leading-[50px] leading-[30px] text-white lg:text-[50px] md:text-[40px] text-[24px] self-start">
              Good Production
            </h1>
          </div>
          <p className="my-[20px] text-white font-poppins md:text-[15px] sm:text-[14px] text-[12px]">
            Planting Healthy Discussion, Nourishing Communities
          </p>

          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow-lg">
              <a
                className="w-full flex items-center justify-center px-3 py-3 text-base leading-6 font-medium rounded-md text-white bg-[#307047] hover:bg-[#24643B]  hover:text-white focus:ring ring-offset-2 ring-[#449a64] focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                href="/discussion"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/*SUBHEADING*/}
      <section className="flex flex-col sm:flex-row justify-around md:px-10 md:py-10 p-5 items-center gap-10">
        <div className="text-justify font-poppins md:p-5 p-0">
          <h1 className=" font-bold md:text-[32px] text-[18px] mb-5">
            Nurtured by: Quezon City.
          </h1>
          <p className="lg:text-2xl text-[14px] max-sm:text-[16] ">
            There’s only one thing we love more than plants, and that’s people.
            This is why we’re so proud to be part of the Quezon City. It’s a
            community that demonstrates that, when you create the right
            conditions, flourishing happens naturally.
          </p>
        </div>
        <div className="w-full justify-center">
          <video
            id="my-player"
            className="video-js shadow-lg shadow-black rounded-lg md:w-full"
            autoPlay
            loop
            muted
            preload="auto"
            data-setup="{}"
          >
            <source
              src="https://utfs.io/f/98497904-5cf0-4831-9b69-54bd61b91576-hasja.mp4"
              type="video/mp4"
            ></source>
          </video>
        </div>
      </section>
      {/*ABOUT US*/}
      <section
        id="aboutus"
        className="h-[85vh] flex justify-center items-center bg-cover bg-center bg-[url('../../../public/images/Aboutbg.png')] border-t-[1px] border-black md:p-10 p-5"
      >
        <div className=" from-muted ">
          <h1 className="text-center mb-5 md:mb-10 font-poppins font-bold md:text-5xl text-4xl text-amber">
            ABOUT US
          </h1>

          <div className="flex gap-10">
            <div className="text-slate-200">
              <div className=" mb-5 lg:px-44 md:px-32 sm:px-12 ">
                <h2 className="font-poppins font-bold text-2xl mb-5 text-center lg:text-[24px] md:text-[20px] text-[18px]">
                  Quezon City Urban Farming
                </h2>
                <p className="font-poppins font-normal lg:text-[25px] md:text-[18px] text-[16px] mb-5 text-justify">
                  AGreen Nature Connect, are committed to building a sustainable
                  future by connecting individuals, businesses, and communities
                  to nature. Our website is an information hub and marketplace
                  dedicated to promoting environmental awareness, sustainable
                  practices, and green living.
                </p>
                <p className="font-poppins font-normal lg:text-[25px] md:text-[18px] text-[16px] mb-5 text-justify">
                  We provide comprehensive information, articles, and guides on
                  a wide range of environmental topics, including conservation,
                  renewable energy, eco-friendly lifestyle guidance, and
                  biodiversity preservation.
                </p>

                <p className="font-poppins font-normal lg:text-[25px] md:text-[18px] text-[16px] mb-5 text-justify">
                  Agreen Nature Connect is a marketplace where individuals can
                  discover and support sustainable products from environmentally
                  conscious businesses.
                </p>
                <p className="font-poppins font-normal lg:text-[25px] md:text-[18px] text-[16px] text-justify">
                  Our platform encourages community engagement through forums,
                  discussions, and events that bring like-minded individuals
                  together and foster collaboration toward environmental goals.
                </p>
              </div>
              <div className=" text-center pb-5">
                <div className="sm:flex justify-center">
                  <div className="rounded-md shadow-lg">
                    <a
                      className="w-full flex items-center justify-center px-3 py-3 text-base leading-6 font-medium rounded-md text-white bg-[#307047] hover:bg-[#24643B]  hover:text-white focus:ring ring-offset-2 ring-[#449a64] focus:outline-none transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                      href="/about"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Services*/}
      <section id="services" className="">
        <h1 className="text-center font-poppins font-bold md:text-[44px] text-[30px] mb-5 pt-10">
          SERVICES
        </h1>
        <div className="md:flex grid md:gap-10 gap-3 justify-center items-center pb-20 px-5 py-5">
          <div className="bg-[#CFE2CE] shadow-md shadow-black hover:shadow-black hover:bg-white hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <div className="flex py-3">
              <Image
                className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
                src={LightIcon}
                alt="Light Icon"
              />
              <h3 className="font-poppins font-bold md:text-[22px] text-[18px] px-3">
                Shares Ideas
              </h3>
            </div>
            <p className="md:text-[16px] text-[14px] font-poppins my-2">
              Connect with our network to share insights and collaborate on
              cultivating urban agriculture success.
            </p>
            <Link href={"/discussion"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[14px] hover:text-dark-green pt-5">
                SEE MORE
                <Image src={ArrowIcon} alt="Arrow Icon" />
              </button>
            </Link>
          </div>
          <div className="bg-[#CFE2CE] shadow-md shadow-black hover:shadow-black hover:bg-white hover:shadow-lg  rounded-3xl p-5 md:w-1/5  md:hover:scale-110 ease-in-out duration-300 drop-shadow-2xl">
            <div className="flex py-3">
              <Image
                className="sm:h-[40px] h-[30px] sm:w-[40px] w-[30px]"
                src={DeliveryIcon}
                alt="Delivery icon"
              />
              <h3 className="font-poppins font-bold md:text-[22px] text-[18px] px-3">
                Order Products
              </h3>
            </div>
            <p className="md:text-[16px] text-[14px] font-poppins my-2">
              Buy fresh from the farm products. Help local urban farmers to have
              achieve sustainability and efficiency.
            </p>
            <Link href={"/markethub"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[14px] hover:text-dark-green pt-5">
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
              <h3 className="font-poppins font-bold md:text-[22px] text-[18px] px-3">
                Learn Online
              </h3>
            </div>
            <p className="md:text-[15px] text-[14px] font-poppins my-2">
              Discover the world of urban agriculture with our network. Join us
              in learning and growing together in urban farming.
            </p>
            <Link href={"/learningMaterials"}>
              <button className="flex gap-2 font-poppins font-semibold md:text-[14px] text-[14px] hover:text-dark-green pt-5">
                SEE MORE
                <Image src={ArrowIcon} alt="Arrow icon" />
              </button>
            </Link>
          </div>
        </div>
        {/*Features*/}
        <div className="flex bg-muted-green items-center">
          <Image
            className="md:block hidden"
            src={Feature}
            alt="Feauture Image"
            style={{ width: "50%", height: "100%" }}
          />
          <div className="px-5">
            <h2 className="font-poppins font-bold text-[32px] text-amber my-10">
              Providing High Quality Products
            </h2>
            <div className="flex items-center gap-3 my-14">
              <div className=" bg-dark-green p-3 rounded-full">
                <Image src={GrowthIcon} alt="Growth Icon" />
              </div>
              <div className="font-poppins ">
                <h4 className="py-2 text-[18px] font-semibold text-white">
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
              <div className="font-poppins">
                <h4 className="py-2 text-[18px] font-semibold text-white">
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
            <div className="bg-gradient-to-r from-[#F7C35FCC] to-[#F7C32929] w-full flex flex-col rmd:flex md:flex-row justify-between items-center gap-5 sm:px-40 px-35 py-14">
              <div className="flex  items-center gap-5">
                <div className="ml-5 bg-dark-green p-3 rounded-full">
                  <Image src={GrowthIcon} alt="Growth Icon" />
                </div>
                {/*The font style doesn't work */}
                <h1 className="font-dancing-script font-normal md:text-2xl text-md text-dark-green">
                  We are Leader in Urban Farming Market
                </h1>
              </div>
              <Link href={"/markethub"}>
                <button className="px-5 py-3 text-dark-green font-poppins  bg-[#F7C35F] rounded-xl hover:scale-110 ease-in duration-100 md:mr-5 mr-0 max-md:text-[12px]">
                  Discover More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/*Contact Us*/}
      <section
        id="contactus"
        className="flex lg:px-20 px-3 border-b border-black justify-between"
      >
        <div className="lg:w-1/2 w-full p-10 font-poppins">
          <h4>CONTACT NOW</h4>
          <h1 className="font-poppins font-bold text-[30px] ">
            GET IN TOUCH NOW
          </h1>
          <p className=" md:text-[16px] text-[14px]">
            Get in touch with us! Reach out for any inquiries, collaborations,
            or questions. Connect with our team to explore urban farming
            possibilities together.
          </p>
          <div className="font-poppins">
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
                  agreennatureconnect@agreennatureconnect.online
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
              className="block text-md font-poppins font-bold leading-6 text-gray-900 pt-2"
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
                  className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=" Full Name"
                />
              </div>
            </div>
            <label
              htmlFor="name"
              className="block text-sm font-poppins font-bold leading-6 text-gray-900 pt-2"
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
                  className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder=" Your Email"
                />
              </div>
            </div>
            <label
              htmlFor="message"
              className="block text-md font-poppins font-bold leading-6 text-gray-900 pt-2"
            >
              Messsage
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows={3}
                className="block w-full rounded-md   py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                placeholder="  Your Message"
              />
            </div>
            <button
              type="submit"
              className="bg-amber text-black w-2/5 mt-5 p-2 font-poppins rounded-xl hover:scale-110 ease-in duration-100 max-md:flex max-md:w-full max-md:justify-center max-md:text-[12px]"
            >
              Submit Message
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
