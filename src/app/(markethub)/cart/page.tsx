  "use client";
  import axios from "axios";
  import Image from "next/image";
  import Link from "next/link";
  import { useRouter } from "next/navigation";
  import React, { Suspense, useEffect, useState } from "react";
  import { FaArrowLeft } from "react-icons/fa";
  import { z } from "zod";
  import { useLocalStorage } from "../hooks/useLocalStorage";
  import Loading from "../loading";
  import { useCart } from "@/contexts/CartContext";
  import DeleteCartItemModal from "../components/DeleteCartItemModal";
  import { toast } from "@/lib/hooks/use-toast";
  import { CartwithProduct } from "@/lib/types";
  import { button } from "@nextui-org/react";
  import { Button } from "@/components/ui/button"
  import { BadgePlus, ShoppingCart } from 'lucide-react'



  function CartPage() {
    const { cartNumber, setCartNumber } = useCart();
    const [cartItems, setCartItems] = useState<CartwithProduct[]>([]);
    const [selectedItems, setSelectedItems] = useState<CartwithProduct[]>([]);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();
    const { setItem } = useLocalStorage("value");

    useEffect(() => {
      fetchCartItems();
    }, []);
   
    const handlebuynow = () => {
      router.push('markethub');
    }

    const handleCheckout = (value: CartwithProduct[]) => {
      try {
        setItem(value);
        router.push("/cart/checkout");
      } catch (error) {}
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/markethub/cart");
        setCartItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const deleteCartItem = async (
      cartItemId: string,
      productName: string,
      closeModal: () => void
    ) => {
      try {
        const response = await axios.post(`/api/markethub/cart/deleteCartItem`, {
          id: cartItemId,
        });
        // Update the cart items without the deleted item
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== cartItemId)
        );

        // Update the selected items without the deleted item
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter((item: CartwithProduct) => item.id !== cartItemId)
        );
        setCartNumber((prevCartNumber) => prevCartNumber - 1);
        toast({
          title: productName,
          description: productName + " has been removed from your cart!",
          variant: "default",
        });
        fetchCartItems();
        closeModal();
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Handle validation error
          console.error("Validation Error:", error.errors);
        } else {
          // Handle other errors
          console.error("Error deleting cart item:", error);
        }
      }
    };

    // Function to group items by community name
    // const groupItemsByCommunity = () => {
    //   const groupedItems: Record<string, CartwithProduct[]> = {};

    //   cartItems.forEach((item: CartwithProduct) => {
    //     const communityName = item.product.community.name
    //     if (!groupedItems[communityName]) {
    //       groupedItems[communityName] = [];
    //     }
    //     groupedItems[communityName].push(item);
    //   });

    //   return groupedItems;
    // };

    const calculateSubtotal = (selectedItems: CartwithProduct[]) => {
      return selectedItems.reduce((total, item) => {
        const priceToAdd = item.product.isFree
          ? 0
          : item.totalPrice;
        return total + priceToAdd;
      }, 0);
    };

    const groupItemsByCommunity = () => {
      const groupedItems: Record<string, CartwithProduct[]> = {};
  
      cartItems.forEach((item: CartwithProduct) => {
        const communityName = item.product.community?.name;
        if (!groupedItems[communityName]) {
          groupedItems[communityName] = [];
        }
        groupedItems[communityName].push(item);
      });
  
      return groupedItems;
    };
    
    const handleToggleSelect = (item: CartwithProduct) => {
      setSelectedItems(prevSelectedItems => {
        // Check if the item is already selected
        const selectedIndex = prevSelectedItems.findIndex(selectedItem => selectedItem.id === item.id);
        if (selectedIndex !== -1) {
          // If selected, remove it from the selectedItems
          return prevSelectedItems.filter(selectedItem => selectedItem.id !== item.id);
        } else {
          // If not selected, add it to the selectedItems
          return [...prevSelectedItems, item];
        }
      });
    };
   
    
    const groupedItems = groupItemsByCommunity();
    console.log(selectedItems)
    // const groupedItems = groupItemsByCommunity();

    const handleGoBack = () => {
      router.back();
    };
    
    return (
      <div>
        <div className="relative pl-5 w-full">
          <div className="absolute top-3">
            <button onClick={handleGoBack}>
              <FaArrowLeft />
            </button>
          </div>
          <h1 className="font-bold text-[2rem] text-center">Cart</h1>
        </div>
        
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4 px-4 md:px-6">
            <div className="mb-4 text-center text-gray-500 dark:text-gray-400">
              You haven't added any products to your cart yet. Buy now to get started.
            </div>
            <Button className="flex items-center text-black border-2 border-green bg-transparent hover:bg-transparent" onClick={handlebuynow}>
              < ShoppingCart className="mr-2 h-4 w-4" />
              Shop now
            </Button>
          </div>
        )}

        {/* <Suspense fallback={<Loading />}>F
        {Object.entries(groupedItems).map(([communityName, items]) => (
        <div key={communityName}>
        
          <h2 className="font-bold text-lg">{communityName}</h2>
        
          {items.map((item) => (
            <div key={item.id}>
              {
              <p>{item.product.name}</p>
              <p>Price: ₱{item.totalPrice.toFixed(2)}</p>
              
            </div>
          ))}
        </div>
      ))}
        </Suspense> */}
        {Object.entries(groupedItems).map(([communityName, items]) => (
          
          <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 max-w-md mx-auto mb-4" key={communityName}>
            {/* Render community name */}
            
            <h2 className="font-bold text-lg">{communityName}</h2>
            {/* Render items in this community */}
            {items.map((item) => (
              <div>
            <div className="flex items-center justify-between" key={item.id}>
              <input
                type="checkbox"
                className="h-5 w-5 ui-checked:text-green"
                checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                disabled={item.kilograms > item.product.quantity}
               
                onChange={() => handleToggleSelect(item)}
              />
              <div className={` w-10 h-10  ${item.kilograms > item.product.quantity? " opacity-35" : "opacity-100"}`}>
                <Image src={item.product.productImage} width={50} height={50} alt={item.product.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className={`text-sm font-medium pl-2 ${item.kilograms > item.product.quantity? "text-gray-400" : ""}`}>{item.product.name}</h3>
              <div className={`text-sm font-medium pl-2 ${item.kilograms > item.product.quantity? "text-gray-400" : ""}`}>{item.kilograms}Kg</div>
              <p className={`text-sm font-medium pl-2 ${item.kilograms > item.product.quantity? "text-gray-400" : ""}`}>Price: ₱{item.totalPrice.toFixed(2)}</p>
              <DeleteCartItemModal cartId={item.id} deleteCartItem={deleteCartItem} itemName={item.product.name} />
              </div> 
                {item.kilograms > item.product.quantity && (
                  <div className="text-center pt-3">
                    <p className="text-sm text-red-500">Out of stock</p>
                  </div>
                )}
                {/*item.product.quantity === 0 && (
                  <div className="text-center pt-3">
                    <p className="text-sm text-red-500">Already out of stock</p>
                  </div>
                )*/}
                            
          </div>
          
            
            ))}
          </div>
        ))}
        {/* Display the subtotal based on selected items */}
        <div className="fixed bottom-0 w-full flex">
          <div className="w-1/2 flex justify-center items-center bg-green py-5 text-[1rem] text-white font-semibold fon font-poppins">
            <h1 className="text-center">
              Sub Total:
              <span className="lg:text-lg text-sm font-bold ml-10">
                ₱ {calculateSubtotal(selectedItems).toFixed(2)}
              </span>
            </h1>
          </div>

          <button
            onClick={() => handleCheckout(selectedItems)}
            disabled={selectedItems.length < 1 ? true : false}
            className={`w-1/2 text-xs sm:text-2xl font-bold ${
              selectedItems.length < 1
                ? "bg-yellow-200 text-gray-400"
                : "bg-yellow-400"
            } transition-all duration-1000 ease-linear`}  
          >
            Checkout
          </button>
        </div>
        {}
      </div>
    );
  }

  export default CartPage;
