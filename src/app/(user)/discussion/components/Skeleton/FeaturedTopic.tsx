import Skeleton from 'react-loading-skeleton'

export default function FeaturedTopicsSkeleton() {
  return (
    
    <div className='flex-1'>
        <Skeleton height={10} count={5}/>
    </div>
 
       
  )
}