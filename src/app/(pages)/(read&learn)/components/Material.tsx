'use client'
import CustomButton from '@/app/components/Buttons/CustomButton'
import Image from 'next/image'
import { useCallback } from 'react';
import MaterialImage from '../images/learning-mat.png'
import { Button } from '@/app/components/Ui/Button';
import { BiDownload, BiSolidBookReader } from 'react-icons/bi'
function Material() {
    
    const handleDownload = () => {
        console.log('click')
      };
      
  return (
    <main className='flex flex-col gap-5'>
        <div className='sm:px-[3%] lg:mr-[25%] bg-white p-5 w rounded-xl shadow-sm drop-shadow-sm'>
            <div className='flex gap-5'>
                <div className=''>
                    <Image 
                        src={MaterialImage} 
                        alt='Learning Materials Image' 
                        className='ob object-contain'
                        />
                </div>
                <div className='relative'>
                    <h1 className='font-poppins font-bold text-icons'>Lesson 1 - Lorem ipsum dolor, sit amet consectetur adipisicing elilt.</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium explicabo illum natus error harum eius veniam. Eum ducimus nihil obcaecati aut eveniet, laboriosam tempora iusto, error est, perferendis illo.</p>
                </div>
            </div>
            <div className='relative flex justify-end gap-5'>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiSolidBookReader/>
                        Read
                    </span>
                </Button>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiDownload/>
                        Download
                    </span>
                    
                </Button>
            </div>
        </div>
        <div className='sm:px-[3%] lg:mr-[25%] bg-white p-5 w rounded-xl shadow-sm drop-shadow-sm'>
            <div className='flex gap-5'>
                <div className=''>
                    <Image 
                        src={MaterialImage} 
                        alt='Learning Materials Image' 
                        className='ob object-contain'
                        />
                </div>
                <div className='relative'>
                    <h1 className='font-poppins font-bold text-icons'>Lesson 1 - Lorem ipsum dolor, sit amet consectetur adipisicing elilt.</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium explicabo illum natus error harum eius veniam. Eum ducimus nihil obcaecati aut eveniet, laboriosam tempora iusto, error est, perferendis illo.</p>
                </div>
            </div>
            <div className='relative flex justify-end gap-5'>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiSolidBookReader/>
                        Read
                    </span>
                </Button>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiDownload/>
                        Download
                    </span>
                    
                </Button>
            </div>
        </div>
        <div className='sm:px-[3%] lg:mr-[25%] bg-white p-5 w rounded-xl'>
            <div className='flex gap-5'>
                <div className=''>
                    <Image 
                        src={MaterialImage} 
                        alt='Learning Materials Image' 
                        className='ob object-contain'
                        />
                </div>
                <div className='relative'>
                    <h1 className='font-poppins font-bold text-icons'>Lesson 1 - Lorem ipsum dolor, sit amet consectetur adipisicing elilt.</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis praesentium explicabo illum natus error harum eius veniam. Eum ducimus nihil obcaecati aut eveniet, laboriosam tempora iusto, error est, perferendis illo.</p>
                </div>
            </div>
            <div className='relative flex justify-end gap-5'>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiSolidBookReader/>
                        Read
                    </span>
                </Button>
                <Button
                    onClick={handleDownload}
                    variant={'green'}
                >
                    <span className='flex items-center gap-2'>
                        <BiDownload/>
                        Download
                    </span>
                    
                </Button>
            </div>
        </div>
    </main>
  )
}

export default Material