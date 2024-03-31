
import prisma from '@/lib/db/db'
import Free from '../../components/Free';
import ProductTab from '../../components/ProductTab';
import { ShadcnCarousel } from '../../components/sCarousel';
import { NovaProperCarousel } from '../../components/NovaProperCarousel';
import { BagongSilanganCarousel } from '../../components/BagongSilanganCarousel';
import { BagbagCarousel } from '../../components/BagbagCarousel';
import Back from '../../components/Back';
import ProductsByCommunity from '../../components/ProductsByCommunity';

const page = async ({ 
  params,
  searchParams
}:{
  params: { communityName: string };
  searchParams?: { communityId: string};
}) => {
  const communityName = params.communityName.replace(/%20/g, ' ');
  
  return (
    <div className='relative '>
      <Back/>
      <h1 className='text-2xl text-center font-poppins font-bold'>{communityName} Urban Farm</h1>
      <div className='w-full my-5'>
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
      <div className='sticky top-20 w-full mt-5 '>
        <ProductsByCommunity communityId={searchParams?.communityId}/>
      </div>
    </div>
  )
}

export default page