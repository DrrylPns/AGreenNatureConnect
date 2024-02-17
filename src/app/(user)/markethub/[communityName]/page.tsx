
import prisma from '@/lib/db/db'
import Free from '../components/Free';

interface Props {
    params: { communityName: string };
  }
  
const page = async ({ 
  params,
  searchParams
}:{
  params: { communityName: string };
  searchParams?: { communityId: string};
}) => {

  const getProductsByCommunity = await prisma.product.findMany({
    where:{
      communityId: searchParams?.communityId,
    }
  })

  return (
    <div>
       <h1>Barangay {params.communityName} market</h1>
       <div>
          <Free communityId={searchParams?.communityId}/>
       </div>
        {getProductsByCommunity.map((product)=>(
          <div key={product.id} className=''>
            <h1>{product.name}</h1>

          </div>
        ))}
    </div>
  )
}

export default page