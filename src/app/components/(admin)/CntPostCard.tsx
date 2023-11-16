"use client"
import {Card, Metric, Text} from "@tremor/react"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const CntPostCard = () => {
    const { data: cntPosts, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
          const {data} = await axios.get("/api/admin/post")
          return data
        }
      })

  return (
    <Card className="" decoration="top" decorationColor="fuchsia">
        <Text>Posts</Text>
        <Metric>{isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
           <>
            {cntPosts}
           </>
        )}</Metric>
    </Card>
  )
}

export default CntPostCard