"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosAddCircleOutline, IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Cart, ShippingInfo } from "@/lib/types";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/hooks/use-toast";

const PaymentMethod = [
  'Cash on delivery',
  'Gcash', 
 
]

function CheckoutModal({}: {}) {
  const [checkoutItems, setCheckoutItems] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [shippingInfo , setShippingInfo] = useState<ShippingInfo>()
  const [isProcessing, setisProcessing] = useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const { getItem } = useLocalStorage("value");
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { cartNumber, setCartNumber } = useCart();
  const [selectedValue, setSelectedValue] = useState('');
  const [method, setMethod] = useState("")
  const [error, setError] = useState("")

  // Function to handle the change event of the select element
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setItems();
    getShippingInfo()
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(()=>{
    setError('')
  },[method])

  const setItems = () => {
    setCheckoutItems(getItem);
  };

  //get Shipping info from db
  const getShippingInfo = async()=>{
    try {
      const res = await axios.get(`/api/markethub/shippingInfo`);
      setShippingInfo(res.data)
    } catch (error: any) {
      throw new Error(`Error fetching Shipping info: ${error.message}`);
    }
  }

  //Close the modal
  function closeModal() {
    setIsOpen(false);
  }
  //Open the modal
  function openModal() {
    setIsOpen(true);
  }
  // Function to group items by community name
  const groupItemsByCommunity = () => {
    const groupedItems: Record<string, Cart[]> = {};

    checkoutItems.forEach((item: Cart) => {
      const communityName = item.variant.product.community.name;
      if (!groupedItems[communityName]) {
        groupedItems[communityName] = [];
      }
      groupedItems[communityName].push(item);
    });

    return groupedItems;
  };

  const groupedItems = groupItemsByCommunity();

  // Calculate total price for each barangay and get the sum of total prices
  const calculateSubtotal = (selectedItems: Cart[]) => {
    return selectedItems.reduce((total, item) => {
      const priceToAdd = item.variant.product.isFree ? 0 : (item.variant.price * item.quantity);
      return total + priceToAdd;
    }, 0);
  };

  const subtotalByBarangay: Record<string, number> = {};
  Object.entries(groupedItems).forEach(([communityName, communityItems]) => {
    subtotalByBarangay[communityName] = calculateSubtotal(communityItems);
  });

  // Get the sum of total prices for all barangays
  const totalSum = Object.values(subtotalByBarangay).reduce(
    (sum, subtotal) => sum + subtotal,
    0
  );

  const handleAddShippingInfo = () => {
    router.push("/shipping-information");
  };

  const handlePlaceOrder = async () => {
    if(method === ''){
      setError("You must select a payment method first!")
      closeModal()
      return
    }
    if(shippingInfo === undefined || shippingInfo === null){
      closeModal()
      toast({
        title: "Not Allowed",
        description: "Add your shipping information!",
        variant: "destructive",
      });
      return
    }
    setDisableBtn(true);
    setisProcessing(true);
    try {
      const response = await fetch("/api/markethub/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Items: checkoutItems, paymentMethod: method }),
      });
  
      if (response.ok) {
        if(method==="Gcash"){
          router.replace(`checkout/payment/${method}`)
        } else {
          router.replace("/cart/checkout/success");
        }
        setCartNumber((prevCartNumber) => prevCartNumber - checkoutItems.length);
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      {!isProcessing ? (
        <div>
          <div className="relative pl-5 w-full">
            <div className="absolute top-3">
              <Link href={'/cart'} >
                <FaArrowLeft />
              </Link>
            </div>
            <h1 className="font-bold text-[2rem] text-center">Checkout</h1>
          </div>
          {!shippingInfo && (
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-col items-center justify-center text-sm md:text-md lg:text-lg mb-5">
                <p className="text-gray-400 text-center">
                  If you intend to ship your order using courier(ex. lalamove,
                  grab, etc.) and for faster transaction.
                </p>
                <button onClick={handleAddShippingInfo} className="">
                  <div className="text-2xl text-yellow-400 flex items-center">
                    <IoIosAddCircleOutline />
                    <span>Add shipping information</span>
                  </div>
                </button>
              </div>
            </div>
          )} 
          
          {shippingInfo && (
            <div className="mx-3 border-gray-300 border-2 bg-gray-50 sm:mx-[10%] shadow-md drop-shadow-lg p-5">
              <h1 className="text-sm md:text-2xl font-poppins font-semibold text-center">Shipping Information</h1>
            <div className="block sm:flex px-3  md:px-10 py-5 text-black">
              <div className="hidden sm:block text-4xl text-red-600">
                <FaLocationDot />
              </div>
              <div className="ml-10 text-sm md:text-md lg:text-lg">
                <h3>Full Name : {shippingInfo.name}</h3>
                <h3 className="text text-wrap">
                  Address: {shippingInfo.address}{" "}
                </h3>
                <h3>Email : {shippingInfo.email}</h3>
                <h3>Contact Number : {shippingInfo.phoneNumber}</h3>
                <h3>Facebook : {shippingInfo.facebook}</h3>
              </div>
              <div className="flex justify-center items-center ml-auto">
                <button
                  onClick={() => {
                    router.push(`/shipping-information`);
                  }}
                  className="bg-yellow-400 rounded-xl px-10 py-2 text-xl font-poppins font-medium text-black"
                >
                  Edit
                </button>
              </div>
            </div>
            </div>
          )}

          {loading != true ? (
            <>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-around px-3 pb-32 md:px-[5%] md:mt-5">
                
                <div className="w-full sm:w-[60%] p-5 rounded-lg border-2 bg-white border-gray-300 shadow-md min-h-[20vh] drop-shadow-lg">
                <h3 className="text-center  font-medium">Check out items</h3>
                {Object.entries(groupedItems).map(
                  ([communityName, communityItems]) => (
                    <div
                      key={communityName}
                      className="mb-5 pb-2 w-full bg-gray-50 shadow-sm drop-shadow-md"
                    >
                      <div className="flex items-center gap-20 border-y-2 bg-gray-100 border-gray-300 py-2 px-10">
                        <h2
                          id={`selectAll_${communityName}`}
                          className="text-[0.7rem] sm:text-[1rem] font-poppins font-bold"
                        >
                          Barangay {communityName}
                        </h2>
                      </div>
                      {communityItems.map((item: Cart) => (
                        <div
                          key={item.id}
                          className="flex gap-5 justify-between pb-2 items-center border-b-2 border-b-gray-300 mx-10 md:mx-[25%] mt-5"
                        >
                          <Image
                            src={item.variant.product.productImage}
                            alt={item.variant.product.name}
                            height={50}
                            width={50}
                            className="w-[20%]"
                          />
                          <div className="text-[0.6rem] sm:text-sm ">
                            <h3>{item.variant.product.name}</h3>
                            <h3>
                              {item.variant.variant}{" "}
                              <span>{item.variant.unitOfMeasurement}</span>
                            </h3>
                          </div>
                          <div className="ml-auto">
                            <h3 className="font-semibold text-[0.6rem] sm:text-sm font-poppins">
                              {" "}
                              {item.variant.product.isFree == true
                                ? "Free"
                                : `₱ ${(item.variant.price * item.quantity)}`}
                            </h3>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between p-5 font-semibold text-[0.6rem] md:text-lg">
                        <h1 className="">
                          Order Total:{" "}
                          <span>₱ {subtotalByBarangay[communityName]}</span>
                        </h1>
                      </div>
                    </div>
                  )
                )}
                </div>
                <RadioGroup value={method} onChange={setMethod} className="sm:min-h-32 sm:w-[20%] bg-gray-50 p-5 rounded-lg border-2 border-gray-300 shadow-md min-h-[20vh] drop-shadow-lg">
                  <RadioGroup.Label className="">Select payment method:</RadioGroup.Label>
                  {PaymentMethod.map((payment) => (
                    <RadioGroup.Option key={payment} value={payment} className={`flex ml-5 mt-3 items-center gap-4 text-xl font-poppins`}>
                       {({ checked }) => (
                        <>
                        <span className={`${checked && 'text-green'} text-xl`}>
                          {checked ? <IoIosRadioButtonOn  /> : <IoIosRadioButtonOff /> }
                        
                        </span>
                        {payment}
                        </>
                        )}
                    </RadioGroup.Option>
                  ))}
                  <h1 className={`${method === '' ? "block":"hidden"} text-sm text-red-500`}>{error}</h1>
                  <div>
                    <h1 className="mt-5">Note:</h1>
                    <p className="text-[0.8rem] text-gray-500">Each item may originate from a distinct community; therefore, kindly ensure that the selected payment method is acceptable to you. The choice made here will serve as the designated payment method for all items during the checkout process.</p>
                  </div>
                </RadioGroup>
              </div>
            </>
          ) : (
            <div className="text-center flex justify-center">
              <RotatingLines
                strokeColor="green"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            </div>
          )}
          {/* Display the subtotal based on selected items */}
          <div className="fixed bottom-0 w-full flex">
            <div className="w-1/2 flex justify-center items-center bg-green py-5 text-[1rem] text-white font-semibold fon font-poppins">
              <h1 className="text-center">
                Sub Total:
                <span className="text-xs sm:text-2xl font-bold ml-10">
                  ₱ {totalSum.toFixed(2)}
                </span>
              </h1>
            </div>
            <button
              onClick={openModal}
              disabled={loading ? true : false}
              className="w-1/2 text-xs sm:text-2xl tracking-wider font-semibold font-poppins bg-yellow-400"
            >
              Place Order
            </button>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold leading-6 text-gray-900"
                      >
                        Are you sure you want to place your order?
                      </Dialog.Title>

                      <div className="my-4">
                        <h1 className="text-sm text-black font-poppins font-medium">
                          Note:
                        </h1>
                        <p className="text-sm text-gray-400 font-livvic">
                          Once your order has been approved you can no longer
                          cancel it.
                        </p>
                      </div>

                      <div className="flex mt-4 gap-5 justify-center items-center">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-10 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          className="inline-flex justify-center rounded-md border border-transparent  bg-green px-10 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                          >
                          Yes
                        </button>
                        
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      ) : (
        <div className="flex justify-center items-center text-2xl font-livvic font-bold">
          <h1>
            <span className="motion-safe:animate-bounce">We are</span>{" "}
            <span className="motion-reduce:animate-bounce">placing your</span>{" "}
            order...
          </h1>
        </div>
      )}
    </div>
  );
}

export default CheckoutModal;
