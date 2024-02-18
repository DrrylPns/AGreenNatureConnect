
import prisma from '@/lib/db/db'
import ProductTab from './ProductTab'

const ProductItem = async() => {
 
  const getAllProducts = await prisma.product.findMany({
    where:{
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
  const others = await prisma.product.findMany({
    where:{
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
        <ProductTab allProducts={getAllProducts} fruits={fruits} vegetables={vegetables} others={others}/>
    </div>
  )
}
export default ProductItem