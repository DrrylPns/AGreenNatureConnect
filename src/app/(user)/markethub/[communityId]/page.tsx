import RelativeDate from '@/app/components/RelativeDate';
import React, { FC } from 'react'

interface Props {
    params: { communityId: string };
  }
  
const page: FC<Props> = ({ params }) => {
  return (
    <div>{params.communityId}
  
    </div>
  )
}

export default page