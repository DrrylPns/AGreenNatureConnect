"use client"
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { UserAvatar } from '../UserAvatar'
import { Button } from '../Ui/Button'
import { Input } from '../Ui/Input'

interface TopicCreatePostProps {
    session: Session | null
}

const TopicCreatePost: FC<TopicCreatePostProps> = ({session}) => {
    const router = useRouter()
    const pathname = usePathname()

  return (
    <section className='w-full'>
            {status === 'loading' ? (
                <div className='text-center flex justify-center'> 
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                    />
               </div> 
            ):(
            <>
                {session ? (
                <div className="flex justify-between items-center gap-5 bg-white rounded-lg drop-shadow-lg w-full px-5 py-5">
                    <Link href={'/profile'} className="w-[2.5rem]">
                        <UserAvatar
                            user={{ name: session?.user.username || null, image: session?.user.image || null }}
                            className="h-8 w-8"
                        />
                    </Link>
                    <Input 
                        type="text" 
                        placeholder="Create post" 
                        className='px-5 py-2 w-[70%] bg-pale rounded-xl'
                        onClick={() => router.push(pathname + '/submit')}
                        readOnly/>

                    <Button 
                        variant={'green'}
                        onClick={() => router.push(pathname + '/submit')}
                    >Create</Button>
                </div>
                ):(
               <></>
                )}
            </>
            )}
        </section>
  )
}

export default TopicCreatePost