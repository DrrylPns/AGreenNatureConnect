import RelativeDate from '@/app/components/RelativeDate';;
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface OrdersProps {
    selectedIndex: number;
    noOrders: string;
    transactions: Transaction[];
    cancelBtnDisplay: "block" | "hidden";
    handleCancel: (transactionId: string) => void;
    handleApprove?: (transactionId: string) => void;
    handlePickup?: (transactionId: string) => void;
    handleComplete?: (transactionId: string) => void;
    status: string;
}
interface Transaction {
    id: string;
    referenceId: string;
    amount: number;
    status: string;
    buyer: Buyer;
    seller: Community
    orderedVariant: OrderedVariant[]
    createdAt: Date;
    updatedAt: Date;
}
interface Community {
    id: string;
    name: string;
}
interface Buyer {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    image: string | null;
    middleName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    address: string | null;
}
interface OrderedVariant {
    id: string;
    product: Product;
    variant: Variants
}
interface Variants {
    id: string
    unitOfMeasurement: string;
    variant: number;
    price: number;
    EstimatedPieces: number;
}
interface Product {
    id: string;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    category: string;
    status: string;
    isFree: boolean;
}


const Orders: React.FC<OrdersProps> = ({ status, noOrders, selectedIndex, transactions, cancelBtnDisplay, handleCancel, handleApprove, handlePickup, handleComplete }) => {

    return (
        <div className='w-full min-h-screen font-poppins transition-all ease-in-out duration-500 '>
            {selectedIndex == selectedIndex && (
                <div className=''>
                    {transactions.length > 0 ? transactions.map((transaction: Transaction) => (
                        <div className='mt-5 border bg-gray-100 border-gray-200 shadow-sm drop-shadow-lg w-[90%] md:w-[70%] lg:w-[60%] mx-auto'>
                            <div className='flex justify-between items-center w-full px-5 md:px-10 py-3 border-gray-200 border-b-2'>
                                <h1 className='text-green font-semibold text-xs sm:text-sm md:text-xl font-poppins'>Barangay {transaction.seller.name}</h1>
                                {/*<h1 className='text-sm text-gray-400' >Ordered on <RelativeDate dateString={transaction.createdAt} /></h1>*/}
                            </div>
                            <div className='flex px-5 md:px-10 w-full my-5 gap-7 sm:gap-10 md:gap-x-20 items-center justify-center lg:justify-around transition-all ease-in-out duration-500'>
                                <div className='w-full'>
                                    {transaction.orderedVariant.map((variant) => (
                                        <Link href={`/order-status/${transaction.id}`} className='w-full flex text-sm flex-1 gap-5 sm:gap-10 justify-between items-center transition-all ease-in-out duration-500'>
                                            <Image
                                                src={variant.product.productImage}
                                                alt={variant.product.name}
                                                height={50}
                                                width={50}
                                                className=''
                                            />
                                            <div className=''>
                                                <h1 className='font-semibold text-[0.6rem] sm:text-xs md:text-lg'>{variant.product.name}</h1>
                                                <p className='font-semibold text-gray-400 text-[0.5rem] sm:text-xs md:text-lg'>{variant.variant.variant} <span>{variant.variant.unitOfMeasurement}</span></p>
                                            </div>
                                            <div className='ml-auto font-semibold text-[0.6rem] sm:text-xs md:text-lg'>
                                                <h1>{variant.product.isFree ? "Free" : `₱ ${variant.variant.price}`}</h1>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className={`flex gap-3`}>
                                    {transaction.status !== "COMPLETED" && transaction.status !== "CANCELLED" && (
                                        <button
                                            className={`px-3 py-1 sm:px-5 sm:py-2 md:px-10 md:py-3 rounded-md text-sm md:text-xl bg-lime-500 text-white font-medium font-poppins transition-all ease-in-out duration-500`}
                                            onClick={() =>
                                                transaction.status === "PENDING"
                                                    ? handleApprove?.(transaction.id)
                                                    : transaction.status === "APPROVED"
                                                        ? handlePickup?.(transaction.id)
                                                        : transaction.status === "PICK_UP"
                                                            ? handleComplete?.(transaction.id)
                                                            : null // You can handle other cases or do nothing here
                                            }
                                        >
                                            {transaction.status === "PENDING"
                                                ? "Approve"
                                                : transaction.status === "APPROVED"
                                                    ? "Pickup"
                                                    : transaction.status === "PICK_UP"
                                                        ? "Completed"
                                                        : ""}
                                        </button>
                                    )}

                                    <button
                                        className={`${transaction.status === "PENDING" ? "block" : "hidden"} px-3 py-1 sm:px-5 sm:py-2 md:px-10 md:py-3 rounded-md text-sm md:text-xl bg-red-500 text-white font-medium font-poppins transition-all ease-in-out duration-500`}
                                        onClick={() => handleCancel(transaction.id)}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between w-full border-y-2 text-right border-gray-300 bg-gray-200 px-5 md:px-10 py-2 md:py-4 transition-all ease-in-out duration-500'>
                                <h1 className='text-[0.5rem] sm:text-sm text-gray-400 font-semibold'>{status}</h1>
                                <h1 className='text-[0.5rem] sm:text-sm font-semibold'>Order Total: <span>₱ {transaction.amount}</span></h1>
                            </div>
                        </div>
                    )) : (
                        <div className='w-full h-screen text-center mt-10'>
                            <h1 className='my-auto text-gray-400 font-semibold font-livvic'>{noOrders}</h1>
                        </div>
                    )
                    }

                </div>
            )}
        </div>
    )
}

export default Orders