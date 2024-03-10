'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function SeeMoreBtn() {

  return (
    <Link href={'/markethub/free-products'}>
      <Button variant={'link'} >See More... </Button>    
    </Link>
  )
}

export default SeeMoreBtn