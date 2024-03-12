import { Button } from "@/app/components/Ui/Button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import Image from "next/image";

interface Transaction {
    id: string;
    referenceId: string;
    amount: number;
    status: string;
    buyer: Buyer;
    paymentMethod: string | null;
    paymentStatus: string | null;
    gcashReciept: string | null;
    seller: Community
    orderedVariant: OrderedVariant[]
    createdAt: Date;
    updatedAt: Date;
}
interface Community {
    id: string;
    name: string;
    qrCode: string | null;
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
    variant: Variants;
    price: number;
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

function QrCodeDrawer({
    transaction
}:{
    transaction: Transaction
}) {
  return (
    <Drawer>
        <DrawerTrigger>Pay now</DrawerTrigger>
        <DrawerContent>
        <DrawerHeader>
            <DrawerTitle>
                <h1 className='text-center'>Scan this QR code to pay!</h1></DrawerTitle>
            <DrawerDescription>
                {transaction.seller.qrCode === null ? (
                    <div>
                        <h1>GCach payment for Community {transaction.seller.name} is not Available right now!</h1>
                  </div>
                ):(
                <div className="bg-gray-200 md:p-10 shadow-md drop-shadow-md p-5">
                    <div className="w-full bg-white text-center">
                        <Image
                        src={transaction.seller.qrCode}
                        width={100}
                        height={100}
                        alt={`Qr code for ${transaction.seller.name}`}
                        className='w w-56 h-56 mx-auto'
                        />
                        <h1 className="font-semibold text-center md:text-3xl">{transaction.seller.name}</h1>
                    </div>
                    <div className='text-xl mt-10'>
                        <h1>Total amount to be paid: <span className='font-semibold text-green text-2xl'>₱ {transaction.amount}</span></h1>
                    </div>
                </div>
                )}
               
            </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
            <Button variant="outline">Cancel</Button>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
  )
}

export default QrCodeDrawer