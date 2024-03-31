import Image from "next/image"

export const LoadingComponent = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                src="/logo.png"
                alt="loading"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    )
}