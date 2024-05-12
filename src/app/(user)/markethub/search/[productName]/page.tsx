
import prisma from '@/lib/db/db'
import SearchBar from '../../components/SearchBar';
import ProductModal from '../../components/ProductModal';
import Back from '../../components/Back';

const page = async ({ 
    params,
    }:{
    params: { productName: string };
    }) => {
    const communityName = params.productName.replace(/%20/g, ' ');
    const AllProducts = await prisma.product.findMany({
        where:{
            status: "APPROVED",
        },
        include:{
            Stock: true,
            community: true,
            reviews: true,
        }
        })

    const getProductByname = await prisma.product.findMany({
        where:{
            name:{
                contains: communityName,
            },
            status:"APPROVED",

            
        },
        include:{
            Stock: true,
            community: true,
            reviews: true,
        },
        orderBy:{
        }
    })
    
  return (
    <div>
        <Back/>
        <div className='w-full flex justify-center md:justify-start'>
            <div className='w-1/2'>
                <SearchBar allProduct={AllProducts}/>
            </div>
        </div>
        <div className='my-5 text-xl font-poppins font-semibold'>
            <h1>Search result for <span className=''>"{communityName}".</span></h1>
            <div className='grid grid-cols-6 w-full  mt-5 border-2 border-slate-200 rounded-lg'>
                {getProductByname.length > 0 ? getProductByname.map((product) => {
                      if (product.quantity < 1) {
                        return null
                    } else {
                        return (
                        <div key={product.id} className=''>
                            <ProductModal  product={product}/>
                        </div>
                        )
                    }
                    }) : (
                    <div className='col-span-12 flex justify-center w-full h-1/2 text-center'>
                        <h1 className='text-2xl font-livvic font-semibold text-gray-500'>There are no available products that contains {communityName} right now!</h1>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default page