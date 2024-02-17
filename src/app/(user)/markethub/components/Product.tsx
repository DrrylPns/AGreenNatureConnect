
import prisma from '@/lib/db/db'
import ProductTab from './ProductTab'

const ProductItem = async() => {
 
  const vegetables = await prisma.product.findMany({
    where:{
      isFree: {
          equals: false
      },
      status:{
          equals: "APPROVED"
      },
      category:{
          equals:"Vegetables"
      },
      variants:{
          some: {
              variant: {
                  not: 0
              }
          }
      }
    },
    include:{
        variants: true,
        community: true
    }
  })

  
  const fruits = await prisma.product.findMany({
    where:{
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

  return (
    <div className=''>
        <ProductTab fruits={fruits} vegetables={vegetables}/>
    </div>
  )
}
export default ProductItem