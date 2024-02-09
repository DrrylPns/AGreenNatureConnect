import { AspectRatio } from '@/app/components/Ui/aspect-ratio';
import Image from 'next/image';
import React from 'react'

interface InformationImageProps {
    src: string;
    title: string;
    description: string;
}

export const InformationImage: React.FC<InformationImageProps> = ({
    src,
    title,
    description,
}) => {
    return (
        <section className=''>
            <div className={`h-[320px] w-full`}>
                <div>{title}</div>
                <div>{description}</div>

                {/* <Image
                    src={src}
                    alt='image of video tutorial'
                    className='object-cover w-full bg-muted'
                    width={1713}
                    height={120}
                    unoptimized
                /> */}
            </div>

        </section>

    )
}
