import Image from 'next/image'
import React from 'react'
import DisplayPhoto1 from '../images/displayphoto3.png'

export default function Community() {
  return (
    <section className='hidden fixed top-24 left-[77%]  h-full w-[21%] lg:block'>
                <div className='bg-white rounded-xl p-3'>
                    <h3 className='font-poppins font-semibold mb-3'>Featured Topic</h3>
                    {/**Post from the community, display maximum of 2*/}
                    <div className='border-b border-gray-600 mb-2'>
                        <div className='flex items-center gap-3'>
                            {/**User Image */}
                            <div className='w-userImage rouded-full'>
                                <Image
                                    src={DisplayPhoto1}
                                    alt='User Image'
                                    
                                />
                            </div>
                            {/**Username */}
                            <h3 className=''>GrahamBallz</h3>
                            {/**Time of the post created or updated ex. 1m ago, 2h ago, yesterday, Oct 22, 2023*/}
                            <h4>7h</h4>
                        </div>
                        {/**Description */}
                        <p className='overflow-hidden overflow-ellipsis line-clamp-2 mt-4 mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni totam, omnis excepturi sapiente nisi, accusantium veritatis in quas illum reiciendis a quasi eligendi similique esse fugit. Porro excepturi aliquid dignissimos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis nulla voluptates itaque consequuntur, rerum quae cum, quisquam tenetur expedita facere commodi dolorum molestiae? Illo laborum nihil, quas incidunt iure mollitia.</p>
                        <button type='button' className='text-gray-400 font-poppins mb-1'>See more...</button>
                    </div>
                    <div className='border-b border-gray-600'>
                        <div className='flex items-center gap-3'>
                            {/**User Image */}
                            <div className='w-userImage rouded-full'>
                                <Image
                                    src={DisplayPhoto1}
                                    alt='User Image'
                                />
                            </div>
                            {/**Username */}
                            <h3 className=''>GrahamBallz</h3>
                            {/**Time of the post created or updated ex. 1m ago, 2h ago, yesterday, Oct 22, 2023*/}
                            <h4>7h</h4>
                        </div>
                        {/**Description */}
                        <p className='overflow-hidden overflow-ellipsis line-clamp-2 mt-4 mb-1'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni totam, omnis excepturi sapiente nisi, accusantium veritatis in quas illum reiciendis a quasi eligendi similique esse fugit. Porro excepturi aliquid dignissimos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis nulla voluptates itaque consequuntur, rerum quae cum, quisquam tenetur expedita facere commodi dolorum molestiae? Illo laborum nihil, quas incidunt iure mollitia.</p>
                        <button type='button' className='text-gray-400 font-poppins mb-1'>See more...</button>
                    </div>
                </div>
                <div className=''>
                    <h3></h3>
                </div>
            </section>
  )
}
