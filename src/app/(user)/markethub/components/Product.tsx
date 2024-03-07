
'use client'
import prisma from '@/lib/db/db'
import ProductTab from './ProductTab'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import RotatingLinesLoading from '@/app/(markethub)/components/RotatingLinesLoading'

const ProductItem = () => {
  const {data, isFetching,} = useQuery({
    queryKey:['Products'],
    queryFn: async () =>{
      try {
        const [allProducts, vegetables, fruits, others] = await Promise.all([
          axios.get('/api/markethub/products'),
          axios.get('/api/markethub/products/vegetables'),
          axios.get('/api/markethub/products/fruits'),
          axios.get('/api/markethub/products/others'),
        ]);
        return {
          allProducts: allProducts.data,
          vegetables: vegetables.data,
          fruits: fruits.data,
          others: others.data,
        };
      } catch (error) {
        
      }
    }
  })

  return (
    <div className=''>
      {isFetching ? (
        <ProductTab 
          allProducts={data?.allProducts} 
          fruits={data?.fruits} 
          vegetables={data?.vegetables} 
          others={data?.others}
        />
      ):(
        <div>
          <RotatingLinesLoading/>
        </div>
      )}
        
    </div>
  )
}
export default ProductItem