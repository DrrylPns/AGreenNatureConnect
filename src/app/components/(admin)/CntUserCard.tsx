"use client"
import { Card, Metric, Text } from "@tremor/react"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const CntUserCard = () => {
  const { data: cntUsers, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/users")
      return data
    }
  })

  return (
    <Card className="" decoration="top" decorationColor="emerald">
      <Text>Users</Text>
      <Metric>{isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <>
          {cntUsers}
        </>
      )}</Metric>
    </Card>
  )
}

export default CntUserCard