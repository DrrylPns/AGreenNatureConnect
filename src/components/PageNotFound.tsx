"use client"
import { Button } from '@/app/components/Ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../app/components/Ui/Button';

export const PageNotFound = () => {
    return (
        <>
            {/* <AspectRatio ratio={16 / 9} className="bg-muted"> */}
            <Image
                src="/images/page-not-found.jpg"
                alt="unauthorized access"
                width={500}
                height={500}
                className="rounded-md object-cover"
            />
            <Link
                href="/discussion"
                className={buttonVariants({
                    variant: "newGreen"
                })}>Go Back</Link>
            {/* </AspectRatio> */}
        </>
    )
}
