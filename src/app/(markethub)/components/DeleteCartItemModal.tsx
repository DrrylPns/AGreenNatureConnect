import { Button } from '@/components/ui/button'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

type DeleteCartItemsProp = {
  cartId: string;
  deleteCartItem: (cartId: string, productName: string, closeModal:()=>void) => void;
  itemName: string;
}

export default function DeleteCartItemModal({cartId, deleteCartItem, itemName }: DeleteCartItemsProp) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <Button
          variant={'outline'}
          type="button"
          onClick={openModal}
          className='bg-red-500 text-white px-1 text-[0.6rem] sm:px-3 sm:py-2 rounded'
        >
          Remove
        </Button>
   

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-700"
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
                    as="h1"
                    className="text-lg py-10 text-center font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete {itemName.toLowerCase()} from your cart?
                  </Dialog.Title>
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
                          className="inline-flex justify-center rounded-md border border-transparent  bg-green px-10 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                          onClick={()=>deleteCartItem(cartId, itemName, closeModal)}
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
    </>
  )
}