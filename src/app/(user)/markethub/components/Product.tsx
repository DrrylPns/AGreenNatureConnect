'use client'
import axios from 'axios';
import ProductTab from './ProductTab'
import { useQuery } from '@tanstack/react-query';

const ProductItem = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const [allProducts, fruits, vegetables, others,] = await Promise.all([
          axios.get('/api/markethub/products'),
          axios.get('/api/markethub/products/fruits'),
          axios.get('/api/markethub/products/vegetables'),
          axios.get('/api/markethub/products/others'),
         
        ]);
  
        return {
            allProducts: allProducts.data,
            fruits: fruits.data,
            vegetables: vegetables.data,
            others: others.data,
        };
      } catch (error: any) {
        throw new Error('Error fetching products: ' + error.message);
      }
    },
  });

  return (
    <>
        <ProductTab 
          allProducts={data?.allProducts} 
          fruits={data?.fruits} 
          vegetables={data?.vegetables} 
          others={data?.vegetables}
          isFetching={isFetching}
          isLoading={isLoading}
        />
    </>
  )
}
export default ProductItem