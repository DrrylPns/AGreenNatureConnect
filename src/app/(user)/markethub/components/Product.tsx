'use client'
import React, { useEffect, useState, Fragment } from 'react'
import Card from './Card'
import { Product, Variants } from '@/lib/types'
import axios from 'axios'
import { Transition, Dialog, RadioGroup, Tab  } from '@headlessui/react'
import Image from 'next/image'

function Product() {
    const [isOpen, setIsOpen] = useState(false);
    const [fruits, setFruits] = useState<Product[]>([]);
    const [vegetables, setVegetables] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0)
  
    
    useEffect(()=>{
      fetchProductsByVegetables()
      fetchProductsByFruits()
    },[selectedIndex])

    function closeModal() {
      setIsOpen(false)
      setSelectedVariant(null)
      setSelectedProduct(null)
    }
  
    function openModal(product: Product) {
      setSelectedProduct(product);
      setIsOpen(true)
    }
    const fetchProductsByVegetables = async() =>{
        try {
          const response = await axios.get('/api/markethub/products/vegetables')
          setVegetables(response.data)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
    }
    const fetchProductsByFruits = async() =>{
      try {
        const response = await axios.get('/api/markethub/products/fruits')
        setFruits(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
  }

  
  return (
    <div className='md:mt-[-4.5rem]'>
      <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="w-full md:w-1/3 text-right border ml-auto mb-10 shadow-lg drop-shadow-lg">
          <Tab className="ui-selected:bg-green ui-selected:text-white ui-selected:border-white ui-not-selected::bg-transparent border border-black transition-all ease-in-out duration-1000 rounded-l-lg py-3 px-4 w-1/2 md:1/4">
            Fruits
          </Tab>
          <Tab className="ui-selected:bg-green ui-selected:text-white ui-selected:border-white ui-not-selected:bg-transparent border border-black transition-all ease-in-out duration-1000 rounded-r-lg py-3 px-4 w-1/2 md:1/4">
            Vegetables
          </Tab>
        </Tab.List>
        <Tab.Panels>
        <Tab.Panel>
          {selectedIndex == 0 &&
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-poppins font-medium ">
              {fruits.length > 0 && fruits.map((product: Product) =>{
                const prices = product.variants.map((variant)=> variant.price);
                const lowestPrice = Math.min(...prices);
                const highestPrice = Math.max(...prices);
                if(product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0) {
                    return null
                  } else {
                  return (
                  <button
                      type='button'
                      onClick={() => openModal(product)}
                      className='relative'
                      disabled={product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? true : false}
                    >
                      
                      <Card 
                        imageUrl={product.productImage} 
                        productName={product.name}
                        barangay={product.community?.name}
                        lowestPrice={lowestPrice}
                        highestPrice={highestPrice}
                      />
                      {product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? (
                      <div className={`absolute top-10 left-10 rounded-full w-3/4 h-3/4 bg-semi-transparent-greenish flex justify-center items-center`}>
                        <span className='text-lg font-poppins text-white font-semibold'>Sold out</span>
                      </div>
                    ):(
                      <div>

                      </div>
                    )} 
                    </button>
                  )
                }
              })}
            </div>
          }
          </Tab.Panel>
          {selectedIndex == 1 &&
            <Tab.Panel>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-poppins font-medium ">
            {vegetables.length > 0 && vegetables.map((product: Product) =>{
                const prices = product.variants.map((variant)=> variant.price);
                const lowestPrice = Math.min(...prices);
                const highestPrice = Math.max(...prices);
                if(product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0) {
                    return null
                  } else {
                  return (
                  <button
                      type='button'
                      onClick={() => openModal(product)}
                      className='relative'
                      disabled={product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? true : false}
                    >
                      
                      <Card 
                        imageUrl={product.productImage} 
                        productName={product.name}
                        barangay={product.community?.name}
                        lowestPrice={lowestPrice}
                        highestPrice={highestPrice}
                      />
                      {product.kilogram === 0 && product.grams === 0 && product.pounds === 0 && product.packs === 0 && product.pieces === 0 ? (
                      <div className={`absolute top-10 left-10 rounded-full w-3/4 h-3/4 bg-semi-transparent-greenish flex justify-center items-center`}>
                        <span className='text-lg font-poppins text-white font-semibold'>Sold out</span>
                      </div>
                    ):(
                      <div>

                      </div>
                    )} 
                    </button>
                  )
                }
              })}
            </div>
            </Tab.Panel>
          }
        </Tab.Panels>
      </Tab.Group>
      
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
                <Dialog.Panel className="w-full max-w-[50rem] max-h[50rem] transform overflow-hidden rounded-t-2xl text-white font-poppins bg-semi-transparent-greenish text-left align-middle shadow-xl transition-all">
                <div className='flex justify-end w-full '>
                  <button type='button' onClick={()=>closeModal()} className='text-white text-[1rem] md:p-5 p-3 '>
                      X
                  </button>
                </div>
                  <div className=' md:flex gap-10 mt-6 mx-6 '>
                    {selectedProduct?.productImage && (
                      <Image
                        src={selectedProduct.productImage}
                        alt='Product Image'
                        width={300}
                        height={300}
                        className="w-full md:w-1/2 h-40"
                      />
                    )}
                    <div className='flex flex-col text text mx-auto'>
                      <div>
                        <h1 className='text-center font-livvic font-bold text-[2.5rem]'>{selectedProduct?.name}</h1>
                        <h1 className='text-center text-pale-white font-poppins text-sm'>from barangay <span className=' font-semibold'>{selectedProduct?.community.name}</span></h1>
                      </div>
                      <span>Available Stocks: 
                        {String(selectedProduct?.kilogram) === "0" ? "": `${String(selectedProduct?.kilogram)}kg,` }
                        {String(selectedProduct?.grams) === "0" ? "": `${String(selectedProduct?.kilogram)}g,` }
                        {String(selectedProduct?.pounds) === "0" ? "": `${String(selectedProduct?.kilogram)}lbs,` }
                        {String(selectedProduct?.pieces) === "0" ? "": `${String(selectedProduct?.kilogram)}pcs,` }
                        {String(selectedProduct?.packs) === "0" ? "": `${String(selectedProduct?.kilogram)}packs` }
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 px-5">
                    <h2>Select variant</h2>
                    {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
                      <div className=''>
                          {selectedProduct.variants.map((variant: Variants)=>(
                                <button 
                                  type='button' 
                                  key={variant.id} 
                                  onClick={() =>{setSelectedVariant(variant)}} 
                                  className={`${selectedVariant === variant? 'bg-blue-200' : 'bg-[#D9D9D9]'} text-black px-5 py-2 w-32 mx-3 transition-transform transform active:scale-95`}>
                                    <div className='text-sm font-semibold'>{`${String(variant.variant)} ${variant.unitOfMeasurement}`}</div>
                                    <div className='text-xs font-semibold text-gray-600'>{`(Est. pc/s ${variant.EstimatedPieces})`}</div>
                                </button>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className='w-full bg-white shadow-md drop-shadow-xl mt-36 '>
                    <span className='text-right font-poppins text-black'>Total Price: ₱ {selectedVariant?.price == undefined ? '0':String(selectedVariant?.price)}</span>
                  </div>

                  <div className="w-full ">
                    <button
                      type="button"
                      className="w-1/2 bg-[#FDE63F] py-5"
                      onClick={closeModal}
                      disabled={selectedVariant == null ? true : false}
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      className="w-1/2 bg-[#24643B] py-5"
                      onClick={closeModal}
                    >
                     Buy Now
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Product