
import prisma from '@/lib/db/db'
import SearchBar from '../../components/SearchBar';
import ProductModal from '../../components/ProductModal';

const page = async ({ 
    params,
    }:{
    params: { productName: string };
    }) => {

    const AllProducts = await prisma.product.findMany({
        where:{
            status: "APPROVED",
        },
        include:{
            community: true,
            variants: true
        }
        })

    const getProductByname = await prisma.product.findMany({
        where:{
            name:{
                contains: params.productName
            },
            status:"APPROVED",
            
        },
        include:{
            community: true,
            variants: true
        }
    })
    
  return (
    <div>
        <div>
            <SearchBar allProduct={AllProducts}/>
        </div>
        <div className='my-5 text-xl font-poppins font-semibold'>
            <h1>Search result for <span className=''>"{params.productName}".</span></h1>
            <div className='mt-5 bordeer-2 border-slate-300 rounded-lg'>
                {getProductByname.length > 0 ? getProductByname.map((product) => {
                    const prices = product.variants.map((variant) => variant.price);
                    const lowestPrice = Math.min(...prices);
                    const highestPrice = Math.max(...prices);
                    if (product.variants.length < 1) {
                        return null
                    }

                    if (product.kilograms < 1 && product.grams < 1 && product.pounds < 1 && product.packs < 1 && product.pieces < 1) {
                        return null
                    } else {
                        return (
                            <div key={product.id}>

                                <ProductModal product={product} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
                            </div>
                        )
                    }
                    }) : (
                    <div className='flex justify-center w-full h-1/2 text-center'>
                        <h1 className='text-2xl font-livvic font-semibold text-gray-500'>There are no available fruits right now!</h1>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default page