import Skeleton from 'react-loading-skeleton'

export default function PostSkeleton() {
  return (
    
    <div className='flex-1 p-5'>
        <div className='flex w-full items-center gap-5 mb-3'>
            <div>
                <Skeleton circle width={40} height={40}/>
            </div>
            <div className='flex-1 w-full'>
                <Skeleton height={20} width={100}/>
            </div>
        </div>
       
        <div>
            <Skeleton height={15} style={{marginBottom: '1rem'}} count={3}/>
        </div>
        <div>
            <Skeleton height={200} count={1}/>
        </div>
        
    </div>
 
       
  )
}