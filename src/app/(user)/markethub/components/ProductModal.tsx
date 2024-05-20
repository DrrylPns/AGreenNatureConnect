'use client'
import { toast } from '@/lib/hooks/use-toast';
import useLoginModal from '@/lib/hooks/useLoginModal';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { Fragment, useState, useTransition } from 'react'
import { z } from 'zod';
import Card from './Card';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/app/(markethub)/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { RatingStars } from './Rating';
import Link from 'next/link';
import { ProductMarkethub } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/Ui/form';
import { Input } from '@/app/components/Ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewPasswordType } from '@/lib/validations/changePasswordSchema';
import { CartSchema, CreateAddToCartType } from '@/lib/validations/addToCartSchema';
import { FormError } from '@/components/form-error';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/Ui/tabs';
import { formatPrice } from '@/lib/utils';


function ProductModal({
  product,

}:{
  product: ProductMarkethub,
}) {
    const { cartNumber, setCartNumber} = useCart();
    const { data: session, status } = useSession()
    const loginModal = useLoginModal()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductMarkethub | null>(null);
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const { setItem } = useLocalStorage('product')
    const [ tabValue, setTabValue ] = useState<string>('kilograms')
    const [isPending, startTransition] = useTransition();
    const [price, setPrice] = useState<number>(0)
    const [priceInPacks, setPriceInPacks] = useState<number>(0)
    const [priceInPieces, setPriceInPieces] = useState<number>(0)
    const [selectedQuantity, setSelectedQuantity] = useState<number>(0)

    function closeModal() {
        setIsOpen(false)

        setSelectedProduct(null)
      }
    function openModal(product: ProductMarkethub) {
    setSelectedProduct(product);
    setSelectedQuantity(product.quantity)
    setIsOpen(true)
    }

    const handleAddToCart = async () => {
      try {
        setIsLoading(true);
    
        // Validate kilograms field
        // if(selectedProduct === null){
        //   return
        // }
        // if (price <= 0) {
          
        //   return; // Exit function if validation fails
        // } else if (price > selectedProduct?.quantity) {
        //   form.setError("kilograms", {type: "custom", message:"Quantity exceeds available stock"}, { shouldFocus: true });
        //   return; // Exit function if validati on fails
        // }
        
      
        if (!selectedProduct) {
          toast({
            title: "No selected Product",
         
            variant: "destructive",
          });
          return
        }
        if(tabValue === "kilograms"){
          if (price <= 0 || price > selectedProduct?.quantity) {
            form.setError("kilograms", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
            return
          } else {
            form.clearErrors('kilograms')
          }
        }
        if(tabValue === "packs"){
          if (priceInPacks <= 0 || priceInPacks > selectedProduct?.quantityIPacks) {
            form.setError("packs", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
            return
          } else {
            form.clearErrors('packs')
          }
        }
        if(tabValue === "pieces") {
          if (priceInPieces <= 0 || priceInPieces > selectedProduct?.quantityInPieces) {
            form.setError("pieces", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
            return
          } else {
            form.clearErrors('pieces')
          }
        }
        // If validation passes, proceed with adding to cart
        const addToCart = await axios.post('/api/markethub/cart', {
          kilograms: tabValue === "kilograms" ? price : tabValue === "packs" ? priceInPacks : priceInPieces , //quantity
          communityId: selectedProduct?.communityId,
          totalPrice: tabValue === "kilograms" ? price * product.priceInKg : tabValue === 'packs' ? priceInPacks * product.priceInPacks : priceInPieces * product.priceInPieces,
          productId: product.id,
          unitOfMeasurement: tabValue
        });
    
        closeModal();
        setIsLoading(false);
        toast({
          description: "Added to cart successfully!",
        });
        setCartNumber((prevCartNumber) => prevCartNumber + 1);
      } catch (error) {
        // Error handling
        if (error instanceof z.ZodError) {
          toast({
            title: "Something went wrong",
            description: "Can't add to cart, please try again later",
            variant: "destructive",
          });
          console.error('Validation Error:', error.errors);
        } else {
          toast({
            title: "Something went wrong",
            description: "Can't add to cart, please try again later",
            variant: "destructive",
          });
          console.error('Error adding to cart:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const handleLogin = () =>{
      closeModal()
      loginModal.onOpen()
    }

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(tabValue === "kilograms"){
        setPrice( Number(e.target.value));
        setPriceInPacks(0)
        setPriceInPieces(0)
      }
      if(tabValue === "packs"){
        setPriceInPacks( Number(e.target.value));
        setPrice(0)
        setPriceInPieces(0)
      }
      if(tabValue === "pieces"){
        setPriceInPieces( Number(e.target.value));
        setPrice(0)
        setPriceInPacks(0)
      }
      
      if (!selectedProduct) {
        toast({
          title: "No selected Product",
       
          variant: "destructive",
        });
      }
  };

    const handleBuyNow = async ()=>{
      if (!selectedProduct) {
        toast({
          title: "No selected Product",
       
          variant: "destructive",
        });
        return
      }
      if(tabValue === "kilograms"){
        if (price <= 0 || price > selectedProduct?.quantity) {
          form.setError("kilograms", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
          return
        } else {
          form.clearErrors('kilograms')
        }
        setItem({selectedProduct,price,tabValue})
      }
      if(tabValue === "packs"){
        if (priceInPacks <= 0 || priceInPacks > selectedProduct?.quantityIPacks) {
          form.setError("packs", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
          return
        } else {
          form.clearErrors('packs')
        }
        setItem({selectedProduct,priceInPacks,tabValue})
      }
      if(tabValue === "pieces") {
        if (priceInPieces <= 0 || priceInPieces > selectedProduct?.quantityInPieces) {
          form.setError("pieces", {type: "custom", message:"Invalid quantity or exceeds available stock."}, { shouldFocus: true });
          return
        } else {
          form.clearErrors('pieces')
        }
        setItem({selectedProduct,priceInPieces,tabValue})
      }
      router.push('/buy-now')
     
    }

    let sumOfRatings = 0;
    let totalNumberOfRatings = 0;
    selectedProduct && selectedProduct.reviews.length > 0 && selectedProduct.reviews.forEach(review => {
        sumOfRatings += review.overAllRating;
        totalNumberOfRatings++;
    });

    const ratingsAverage = selectedProduct && selectedProduct.reviews.length > 0 ? sumOfRatings / totalNumberOfRatings : 0
        
    const form = useForm<CreateAddToCartType>({
      resolver: zodResolver(CartSchema),
  });

  const onSubmit = (values: CreateAddToCartType) => {
      
      startTransition(() => { 
          
      });
  };

  return (
      <button
        type='button'
        onClick={() => openModal(product)}
        className='relative w-full z-10'
        
      >
        <Card
          productId={product.id}
          imageUrl={product.productImage}
          productName={product.name}
          quantity={product.quantity}
          priceInKg={product.priceInKg}
          barangay={product.community?.name}
          productReviews={product.reviews}
          product={product}
        />
         <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[40rem] max-h-fit transform overflow-hidden rounded-t-2xl text-black font-poppins bg-gray-50 text-left align-middle shadow-xl transition-all">
                  <div className='flex justify-end w-full '>
                    <button type='button' onClick={() => closeModal()} className='text-[1rem] md:px-5 p-3 '>
                      X
                    </button>
                  </div>
                  <div className=' md:flex justify-around items-center w-full '>
                    {selectedProduct?.productImage && (
                      <div className='w-full md:w-[15rem] max-h-[15rem] border-gray-300 border-2'>
                      <Image
                        src={selectedProduct.productImage}
                        alt='Product Image'
                        width={250}
                        height={250}
                        className="object-center w-full min-h-[15rem] max-h-[15rem]  sm:mx-0 "
                      />
                      </div>
                    )}
                    <div className='flex flex-col justify-start font-poppins'>
                      <div>
                        <h1 className='text-center font-livvic font-semibold text-3xl'>{selectedProduct?.name}</h1>
                        <h1 className='text-center  font-poppins text-sm'>
                           From {selectedProduct?.community.name}, Brgy.  
                          <span className=' font-semibold'> {selectedProduct?.community.address}</span>
                        </h1>
                      </div>
                      <span className='text-center font-livvic'>
                        Available Stocks:
                      </span>
                      <span className='text-center text-sm mb-3'>
                      Kilograms: {selectedProduct?.quantity}, Packs: {selectedProduct?.quantityIPacks}, Pieces: {selectedProduct?.quantityInPieces}
                      </span>
                      {selectedProduct && selectedProduct?.reviews.length > 0 ? (
                      <Link href={`/markethub/reviews/${product.id}`} className="flex z-30 items-center justify-center my-2 px-2 gap-5 w-full relative rounded-xl overflow-hidden dark:bg-slate-800/25">
                        <h1 className='text-sm  text-gray-600 dark:text-gray-300'>Ratings: {ratingsAverage.toFixed(1)} / 5.0</h1>
                        <h1 className="text-sm  text-gray-600 dark:text-gray-300">{selectedProduct?.reviews.length} Reviews</h1>
                      </Link>
                      ):(
                        <h1 className="text-sm text-center text-gray-600 dark:text-gray-300">{selectedProduct?.reviews.length} Reviews</h1>
                      )}
                     
                    </div>
                  </div>
                  <div className="mt-5 px-5">
                  <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                      <Tabs onValueChange={e=>{
                        setTabValue(e)
                        form.clearErrors()
                        setPrice(0)
                        setPriceInPacks(0)
                        setPriceInPieces(0)
                      }} defaultValue={
                        selectedProduct !== null && selectedProduct.quantity !== 0 ? "kilograms" : selectedProduct?.quantityIPacks !== 0 ? "packs": "pieces"
                        } 
                      className="w-[400px]"
                      >
                        <TabsList>
                          <TabsTrigger disabled={selectedProduct !== null && selectedProduct?.quantity === 0} value="kilograms">Kilograms</TabsTrigger>
                          <TabsTrigger disabled={selectedProduct !== null && selectedProduct?.quantityIPacks === 0}value="packs">Packs</TabsTrigger>
                          <TabsTrigger disabled={selectedProduct !== null && selectedProduct?.quantityInPieces === 0}value="pieces">Pieces</TabsTrigger>
                        </TabsList>
                        <TabsContent value="kilograms">
                          <div className="space-y-4">
                              <FormField
                                  control={form.control}
                                  name="kilograms"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormLabel>Kilograms</FormLabel>
                                          <FormControl>
                                              <Input
                                                  {...field}
                                                  disabled={isPending || selectedProduct !== null && selectedProduct?.quantity === 0}
                                                  defaultValue={0}
                                                  onChange={handleOnchange}
                                                  placeholder="ex. 1.5 for 1/2"
                                                  type="number"
                                              />
                                          </FormControl>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                          </div>
                        </TabsContent>
                        <TabsContent value="packs">
                          <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="packs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Packs</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending || selectedProduct !== null && selectedProduct?.quantityIPacks === 0}
                                                defaultValue={0}
                                                onChange={handleOnchange}
                                                placeholder="ex. 1.5 for 1/2"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                              />
                          </div>
                        </TabsContent>
                        <TabsContent value='pieces'>
                          <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="pieces"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pieces</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending || selectedProduct !== null && selectedProduct?.quantityInPieces === 0}
                                                defaultValue={0}
                                                onChange={handleOnchange}
                                                placeholder="ex. 1.5 for 1/2"
                                                type="number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                              />
                          </div>
                        </TabsContent>
                      </Tabs>
                       
                        {/* <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                            variant="newGreen"
                        >
                            Save
                        </Button> */}
                    </form>
                </Form>
                   
                  </div>
                  <div className='w-full bg-gray-100 border-gray-200 border-t-2 shadow-md drop-shadow-xl mt-10 py-5 px-5'>
                    <span className='text-right text-lg font-poppins text-black'>
                      Total Price:
                      <span className='font-semibold font-poppins text-lg'>  {tabValue === "kilograms"? formatPrice(price  * product.priceInKg) : tabValue === "packs" ? formatPrice(priceInPacks  * product.priceInPacks) : formatPrice(priceInPieces * product.priceInPieces)  }
                      </span>
                    </span>
                  </div>
                  {status === 'authenticated' ? (
                    <div className="w-full ">
                      <Button
                        type="button"
                        className="w-1/2 bg-yellow-300 py-5 h-16 rounded-none outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={() => handleAddToCart()}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
                      </Button>
                      <Button
                        type="button"
                        className="w-1/2 bg-green py-5 h-16  rounded-none outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={() => handleBuyNow()}
                        disabled={ isLoading }
                      >
                        {isLoading ? 'Processing...' : 'Buy Now'}
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full ">
                      <button
                        type="button"
                        className="w-full bg-yellow-600 py-5  outline-gray-500 hover:ring-1 hover:outline-1"
                        onClick={()=> handleLogin()}
                      >
                        Add to Cart
                      </button>
      
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </button> 
  )
}

export default ProductModal