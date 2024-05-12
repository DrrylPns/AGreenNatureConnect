//"use client"
import { Products, columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataTable } from './_components/data-table'
import { fetchAllProducts, fetchProducts } from '../../../../actions/products'
import { Legend } from "@tremor/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs'

const InventoryPage = async () => {

  // const { data: products, isFetching } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => {
  //     const { data } = await axios.get("/api/employee/products")
  //     return data as Products[]
  //   }
  // })

  const products = await fetchProducts()
  const allProducts = await fetchAllProducts()

  return (

    <div className="container mx-auto py-10">
      <Tabs defaultValue="classA" className="w-full">
        <TabsList>
          <TabsTrigger value="allProducts">All Products</TabsTrigger>
          <TabsTrigger value="classA">Class A</TabsTrigger>
          <TabsTrigger value="classB">Class B</TabsTrigger>
          <TabsTrigger value="classC">Class C</TabsTrigger>
        </TabsList>
        <TabsContent value="allProducts">
         
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={allProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classA">
          <h1>*Top 1% to 20% based on their total sales value</h1>
          <h1>*All products in this class is subject for 10% markup.</h1>
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products.categoryAProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classB">
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products.categoryBProducts ?? []}
            isInventory
          />
        </TabsContent>
        <TabsContent value="classC">
          <DataTable
            //@ts-ignore
            columns={columns}
            //@ts-ignore
            data={products.categoryCProducts ?? []}
            isInventory
          />
        </TabsContent>
      </Tabs>
     
      
    </div>
  )
}

export default InventoryPage