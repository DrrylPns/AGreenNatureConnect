//"use client"
import { Products, columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataTable } from './_components/data-table'
import { fetchProducts } from '../../../../actions/products'
import { Legend } from "@tremor/react"

const InventoryPage = async () => {

  // const { data: products, isFetching } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: async () => {
  //     const { data } = await axios.get("/api/employee/products")
  //     return data as Products[]
  //   }
  // })

  const products = await fetchProducts()

  return (

    <div className="container mx-auto py-10">
       {/*<Legend
                className="mt-3"
                categories={["In", "Out of Stock", "Low Stock"]}
                colors={["emerald", "red", "yellow"]}
              />
          */}
     
      <DataTable
        columns={columns}
        //@ts-ignore
        data={products ?? []}
      />
    </div>
  )
}

export default InventoryPage