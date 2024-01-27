'use client'
import React, { useEffect, useState, Fragment } from 'react'
import Card from './Card'
import { Product } from '@/lib/types'
import axios from 'axios'
import { Transition, Dialog, RadioGroup  } from '@headlessui/react'
import Image from 'next/image'
import { Kilo } from '@prisma/client'

function Product() {
    const [isOpen, setIsOpen] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selected, setSelected] = useState<number>(0)
    
    useEffect(()=>{
      fetchProducts()
    },[])

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal(product: Product) {
      setSelectedProduct(product);
      setIsOpen(true)
    }
    const fetchProducts = async() =>{
        try {
          const response = await axios.get('/api/markethub/products')
          setProducts(response.data)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
    }
    function selectedUnit(kilo: Kilo) {
    
      setSelected(kilo.price)
    }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-poppins font-medium ">
        {products.length > 0 && products.map((product: Product) =>(
          <button
            type='button'
            onClick={() => openModal(product)}
          >
            <Card 
              imageUrl={product.productImage} 
              productName={product.name}
              barangay={product.community?.name}
            />
          </button>
        ))}

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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-t-2xl text-white font-poppins bg-semi-transparent-greenish text-left align-middle shadow-xl transition-all">
                  <div className='flex justify-between mt-6 mx-6'>
                    {selectedProduct?.productImage && (
                      <Image
                        src={selectedProduct.productImage}
                        alt='Product Image'
                        width={200}
                        height={200}
                        className=""
                      />
                    )}
                    <div className='text '>
                      <h1 className='text-center'>{selectedProduct?.name}</h1>
                      <h1 className='text-center'>from barangay {selectedProduct?.community.name}</h1>
                     
                    </div>
                  </div>
                  <div className="mt-2">
                    <h2>Kilogram</h2>
                    {selectedProduct?.Kilo && selectedProduct.Kilo.length > 0 && (
                      <div >
                        <RadioGroup value={selected} onChange={setSelected} className='grid grid-cols-3 gap-4 w-full '>
                          {selectedProduct.Kilo.map((kilo: Kilo)=>(
                            <RadioGroup.Option value={kilo.kilo} className='cursor-pointer'>
                              {({ checked }) => (
                                <button type='button' onClick={() => selectedUnit(kilo)} className={`${checked ? 'bg-blue-200' : 'bg-[#D9D9D9]'} text-black px-5 py-2 transition-transform transform active:scale-95`}>{kilo.kilo} Kilo</button>
                              )}
                            </RadioGroup.Option>
                          ))}
                       
                        </RadioGroup>
                      </div>
                    )}

          
                    <div>
                      
                    </div>
                  </div>
                  <div className="mt-2">
                    <h2>Per Pack</h2>
                    <div>

                    </div>
                  </div>
                  <div>
                    <span>Total Price: {selected}</span>
                  </div>

                  <div className="w-full ">
                    <button
                      type="button"
                      className="w-1/2 bg-[#FDE63F] py-5"
                      onClick={closeModal}
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