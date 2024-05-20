
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

  const community = await prisma.community.findUnique({
    where:{
      id: searchParams?.communityId
    },
    include:{
      carouselImage: true
    }
  })
  const allProducts = await prisma.product.findMany({
    where:{
      communityId:{
        equals: community?.id
      },
      status: 'APPROVED',
    },
    include:{
      Stock: true,
      community: true,
      reviews: true,
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
      <div className='relative flex sm:items-center justify-center'>
        <div className='absolute top-2 left-0'>
          <Back/>
        </div>
        <h1 className='text-lg md:text-2xl text-center font-poppins font-bold'>{communityName}</h1>
      </div>
      <div className='w-full my-5 bg-gray-50 dark:bg-[#1f2933] pb-5 px-5 shadow-sm drop-shadow-md'>
       
        <div className='font-livvic'>
          
          <div className='flex flex-col sm:flex-row sm:my-3 sm:items-center md:gap-5 sm:gap-3 justify-center items-center'>
            <Link className='flex items-center gap-3 text-[0.6rem] sm:text-sm text-gray-500 dark:text-white' href={'https://www.google.com/maps/dir//P428%2B79Q+New+Greenland,+Quezon+City,+Rizal/@14.700727,121.1160022,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397bb35978a95fb:0x3748a3771671970!2m2!1d121.1159989!2d14.7007173?entry=ttu'}>
              <span className='text-red-600 text-[0.5rem] sm:text-sm'><CiLocationOn /></span> {community?.address}
            </Link>
            
          </div>


          <p className='text-[0.6rem] sm:text-sm text-gray-500 line-clamp-4 dark:text-[#9ca3af'>{community?.description}</p>
        </div>
        <div className='flex justify-center gap-10 border-t-2 border-gray-100 pt-5 font-poppins text-xs items-center'>
          <h1><span className='text-yellow-500 font-semibold'>{allProducts.length}</span> Products</h1>
          <h1 className='flex items-center'><Star size={10} color='#F7C35F' fill='#F7C35F' className='mr-2'/>Ratings:{ratingsAverage.toFixed(1)} / 5.0</h1>
        </div>
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