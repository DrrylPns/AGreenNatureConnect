
import prisma from '@/lib/db/db'
import Free from '../../components/Free';
import ProductTab from '../../components/ProductTab';
import { ShadcnCarousel } from '../../components/sCarousel';
import { NovaProperCarousel } from '../../components/NovaProperCarousel';
import { BagongSilanganCarousel } from '../../components/BagongSilanganCarousel';
import { BagbagCarousel } from '../../components/BagbagCarousel';
import Back from '../../components/Back';
import ProductsByCommunity from '../../components/ProductsByCommunity';
import { RatingStars } from '../../components/Rating';
import { Star } from 'lucide-react';
import { CiLocationOn, CiPhone } from 'react-icons/ci';
import { TfiEmail } from "react-icons/tfi";
import Link from 'next/link';

const page = async ({ 
  params,
  searchParams
}:{
  params: { communityName: string };
  searchParams?: { communityId: string};
}) => {
  const communityName = params.communityName.replace(/%20/g, ' ');
  const allProducts = await prisma.product.findMany({
    where:{
      communityId:{
        equals: searchParams?.communityId
      },
      isFree: true,
      status: 'APPROVED',
    },
    include:{
      community: true,
      variants: true,
      reviews: true
    }
  })

  let reviewCount = 0;
  let total = 0;
  allProducts.forEach((product) => {
    product.reviews.forEach((review) => {
      total += review.overAllRating;
      reviewCount++;
    });
  });
  const ratingsAverage = reviewCount > 0 ? total / reviewCount : 0;
  return (
    <div className='relative '>
      <div className='relative flex items-center justify-center'>
        <div className='absolute top-2 left-0'>
          <Back/>
        </div>
        <h1 className='text-lg md:text-2xl text-center font-poppins font-bold'>{communityName} Urban Farm</h1>
      </div>
      <div className='w-full my-5 bg-gray-50 dark:bg-[#1f2933] pb-5 px-5 shadow-sm drop-shadow-md'>
        {communityName === 'Bagbag' && (
          <>
            <BagbagCarousel/>
            <div className='font-livvic'>
              <h1 className='text-lg  text-center tracking-widest font-semibold'>Solo Parent Urban Farm</h1>
              <div className='flex items-center justify-around my-3 '>
                <Link className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white' href={'https://www.google.com/maps/dir//P428%2B79Q+New+Greenland,+Quezon+City,+Rizal/@14.700727,121.1160022,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397bb35978a95fb:0x3748a3771671970!2m2!1d121.1159989!2d14.7007173?entry=ttu'}>
                <span className='text-red-600 text-[0.5rem] sm:text-sm'><CiLocationOn /></span> Pahinge Ng address , Quezon City
                </Link>
                <div className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600 text-[0.5rem] sm:text-sm'><TfiEmail /></span> Pahinge Ng @gmail.com
                </div>
                <div className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600 text-[0.5rem] sm:text-sm'><CiPhone /></span> Pahinge Ng Contact Number
                </div>
              </div>
              <p className='text-[0.6rem] sm:text-sm text-gray-500 line-clamp-4 dark:text-[#9ca3af'>Solo Parent Urban Farming, the name of community farm of Barangay Bagbag. It is currently manage by Mr. Rodel Edroso, a focal person of Solo Parent Urban Farming. Urban Farming in Bagbag is under the capable management of Mr. Rodel Edroso, who serves as the focal point for Solo Parent Urban Farming. In collaboration with the Department of Agrarian Reform (DAR), the Quezon City government has set a visionary goal for the seven-hectare plot in Barangay Bagbag. They aim to transform it into the city's primary vegetable hub, through an initiative known as "The Seed of Joy of Urban Farming." This project seeks to underscore the importance of urban agriculture, aiming to alleviate poverty, combat hunger, and enhance food security in marginalized urban communities.</p>
            </div>
            <div className='flex justify-center gap-10 border-t-2 border-gray-100 pt-5 font-poppins text-xs items-center'>
              <h1><span className='text-yellow-500 font-semibold'>{allProducts.length}</span> Products</h1>
              <h1 className='flex items-center'><Star size={10} color='#F7C35F' fill='#F7C35F' className='mr-2'/>Ratings:{ratingsAverage.toFixed(1)} / 5.0</h1>
            </div>
          </>
        )}
        {communityName === 'Nova Proper' && (
          <div className=''>
            <NovaProperCarousel/>
            <div className='font-livvic '>
              <h1 className='text-lg text-center tracking-widest font-semibold'>Sharon Urban Farm</h1>
              <div className='flex items-center justify-around my-1 md:my-3 '>
                <Link className='flex items-center gap-3 text-[0.5rem] sm:text-sm text-gray-500 dark:text-white' href={'https://www.google.com/maps/dir//P428%2B79Q+New+Greenland,+Quezon+City,+Rizal/@14.700727,121.1160022,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397bb35978a95fb:0x3748a3771671970!2m2!1d121.1159989!2d14.7007173?entry=ttu'}>
                  <span className='text-red-600 text-[0.6rem] sm:text-sm'><CiLocationOn /></span> Pahinge Ng address , Quezon City
                </Link>
                <div className='flex items-center gap-3 text-[0.5rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600 text-[0.6rem] sm:text-sm'><TfiEmail /></span> Pahinge Ng @gmail.com
                </div>
                <div className='flex items-center gap-3 text-[0.5rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600 text-[0.6rem] sm:text-sm'><CiPhone /></span> Pahinge Ng Contact Number
                </div>
              </div>
              <p className='text-[0.6rem] sm:text-sm text-gray-500 pb-3 dark:text-[#9ca3af]'>Sharon Urban Farming, the name of community farm of barangay Nova Proper. it is currently manage by Enrique P. Añonuevo, a BESWMC Head of Sharon Urban Farming. Sharon Farm, an integrated urban farm situated at the heart of the city, was launched last June 2, 2021, with collaborative efforts and partnership between public and private stakeholders. The area owned by the Diocese of Novaliches that is approximately 5,500 square meter before the Gulayan sa Siyudad project. This program and movement aim to improve the access of urban settlers and disadvantaged groups to safe and nutritious food, promote social inclusion, and become an important means for recreation and educational activities for the community.</p>
            </div>
            <div className='flex justify-center gap-10 border-t-2 pt-3  border-gray-100 font-poppins text-xs items-center'>
              <h1><span className='text-yellow-500 font-semibold '>{allProducts.length}</span> Products</h1>
              <h1 className='flex items-center'><Star size={10} color='#F7C35F' fill='#F7C35F' className='mr-2'/>Ratings:{ratingsAverage.toFixed(1)} / 5.0</h1>
            </div>
          </div>
        )}
        {communityName === 'Bagong Silangan' && (
          <>
             <BagongSilanganCarousel/>
            <div className='font-livvic'>
              <h1 className='text-lg  text-center tracking-widest font-semibold'>New Greenland Urban Farm</h1>
              <div className='flex items-center justify-around my-3 '>
                <Link className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white' href={'https://www.google.com/maps/dir//P428%2B79Q+New+Greenland,+Quezon+City,+Rizal/@14.700727,121.1160022,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397bb35978a95fb:0x3748a3771671970!2m2!1d121.1159989!2d14.7007173?entry=ttu'}>
                  <span className='text-red-600 text-[0.5rem] sm:text-sm'><CiLocationOn /></span> Pahinge Ng address , Quezon City
                </Link>
                <div className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600text-[0.5rem] sm:text-sm'><TfiEmail /></span> Pahinge Ng @gmail.com
                </div>
                <div className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white'>
                  <span className='text-red-600 text-[0.5rem] sm:text-sm'><CiPhone /></span> Pahinge Ng Contact Number
                </div>
              </div>
              <p className='text-[0.6rem] sm:text-sm text-gray-500 line-clamp-4 dark:text-[#9ca3af]'>New Greenland Farm, the name of community farm of barangay Barangay Bagong Silangan Quezon City. It is the first urban vegetable farm under the Buhay sa Gulay initiative of the Department of Agrarian Reform, Department of Agriculture, and the Quezon City Government. The farm aims to promote urban farming and yielded 700 kilos of veggies in its first harvest.</p>
            </div>
            <div className='flex justify-center gap-10 border-t-2 pt-5  border-gray-100 font-poppins text-sm items-center'>
              <h1><span className='text-yellow-500 font-semibold'>{allProducts.length}</span> Products</h1>
              <h1 className='flex items-center'><Star size={10} color='#F7C35F' fill='#F7C35F' className='mr-2'/>Ratings:{ratingsAverage.toFixed(1)} / 5.0</h1>
            </div>
          </>
        )}
      </div>
      <div className='border-2 border-gray-300 px-3 sm:px-5 pt-5 min-h-40 rounded-md bg-gray- shadow-lg drop-shadow-sm '>
        <Free communityId={searchParams?.communityId}/>
      </div>
      <div className='sticky top-20 w-full mt-5 '>
        <ProductsByCommunity communityId={searchParams?.communityId}/>
      </div>
    </div>
  )
}

export default page