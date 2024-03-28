
import prisma from '@/lib/db/db'
import Free from '../../components/Free';
import ProductTab from '../../components/ProductTab';
import { ShadcnCarousel } from '../../components/sCarousel';
import { NovaProperCarousel } from '../../components/NovaProperCarousel';
import { BagongSilanganCarousel } from '../../components/BagongSilanganCarousel';
import { BagbagCarousel } from '../../components/BagbagCarousel';
import Back from '../../components/Back';

const page = async ({ 
  params,
  searchParams
}:{
  params: { communityName: string };
  searchParams?: { communityId: string};
}) => {
  const communityName = params.communityName.replace(/%20/g, ' ');
  const getProductsByCommunity = await prisma.product.findMany({
    where:{
      communityId: searchParams?.communityId,
      isFree: {
        equals: false
      },
      status:{
          equals: "APPROVED"
      },
    },
    include:{
      community: true,
      variants: true
    }
  })
  const fruits = await prisma.product.findMany({
    where:{
      communityId: searchParams?.communityId,
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Fruits"
      },
      
    },
    include:{
      community: true,
      variants: true
    }
   
  })
  const others = await prisma.product.findMany({
    where:{
      communityId: searchParams?.communityId,
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Others"
      },
      
    },
    include:{
      community: true,
      variants: true
    }
   
  })
  const vegetables = await prisma.product.findMany({
    where:{
      communityId: searchParams?.communityId,
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Vegetables"
      },
      
    },
    include:{
      community: true,
      variants: true
    }
   
  })
  return (
    <div className='relative drop-shadow-sm shadow-md'>
      <Back/>
      <h1 className='text-2xl font-poppins font-bold'>Barangay {communityName} market</h1>
      <div className='w-full'>
        {communityName === 'Bagbag' && (
          <BagbagCarousel/>
        )}
        {communityName === 'Nova Proper' && (
          <NovaProperCarousel/>
        )}
        {communityName === 'Bagong Silangan' && (
          <BagongSilanganCarousel/>
        )}
      </div>
      <div className='border-2 border-gray-300 px-3 sm:px-5 pt-5 min-h-40 rounded-md bg-gray- shadow-lg drop-shadow-sm '>
        <Free communityId={searchParams?.communityId}/>
      </div>
      <div className='sticky top-20 w-full mt-5'>
        <ProductTab allProducts={getProductsByCommunity} vegetables={vegetables} fruits={fruits} others={others}/>
      </div>
    </div>
  )
}

export default page