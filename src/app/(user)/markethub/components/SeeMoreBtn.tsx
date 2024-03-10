'use client'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function SeeMoreBtn() {
    const pathname = usePathname()
    const communityName = pathname.split('/markethub/')[1];
    const router = useRouter()

    const handleOnclick = ()=>{
        router.push(`/markethub/${communityName}/free-products`)
    }

  return (
    <Button variant={'link'} onClick={handleOnclick} >See More... </Button>    
  )
}

export default SeeMoreBtn