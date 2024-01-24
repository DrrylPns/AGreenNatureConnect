"use client"
import { Products, columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataTable } from './_components/data-table'

const InventoryPage = () => {

  const { data: products, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get("/api/employee/products")
      return data as Products[]
    }
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={products ?? []} isFetching={isFetching} />
    </div>
  )
}

export default InventoryPage