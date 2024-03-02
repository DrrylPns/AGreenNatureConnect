import React from 'react'
import Image from "next/image";
import Features from "/public/images/features.png";
import Image1 from "/public/images/image 1.png";
import Image2 from "/public/images/image 2.png";
import Image3 from "/public/images/image 3.png";
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
                          className="lg:block hidden rounded-lg"
                          src={Features}
                          alt="features.png"
                          width={5000}/>
                    </div>
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
                          className="lg:block hidden border rounded-lg"
                          src={Features}
                          alt="features.png"
                          width={5000}/>
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

         {/* Mission and Vision*/}


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