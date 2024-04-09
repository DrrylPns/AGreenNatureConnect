'use client'
import { Combobox, Transition } from '@headlessui/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react'

interface Product {
    id: string;
    itemNumber: number | null;
    productImage: string;
    name: string;
    kilograms: number;
    grams: number;
    pounds: number;
    pieces: number;
    packs: number;
    variants: Variants[]
    category: string;
    status: string;
    isFree: boolean;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
    community: Community;
    communityId: string;
  }
  interface Community {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  
  }
  interface Variants {
    id: string
    unitOfMeasurement: string;
    variant: number;
    price: number;
    EstimatedPieces: number;
    createdAt: Date;
    updatedAt: Date;
  }

function SearchBar({
    allProduct,
}:{
    allProduct: Product[];
}) {
    const [selected, setSelected] = useState<Product>()
    const [query, setQuery] = useState('')
    const router = useRouter()
    const filteredProduct =
        query === ''
        ? allProduct
        : allProduct.filter((product) =>
            product.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
        const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
        
            // Assuming selected is the selected product after user interaction
            if (selected) {
              // Use router.push to navigate to the desired route
              router.push(`/markethub/search/${selected.name}`);
            }
          };
  return (
    <form onSubmit={handleSubmit}>
    <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className=" relative w-full cursor-default overflow-hidden bg-white dark:bg-primary-foreground text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Label className={'mr-5 text-md text-black dark:text-white font-semibold font-poppins'}>Search products: </Combobox.Label>
            <Combobox.Input
              className="w-full bg-slate-100  rounded-lg border-2 border-slate-400 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(product: Product) => product.name}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full z-30 overflow-auto shadow-dark-tremor-input drop-shadow-lg bg-slate-100 rounded-mdpy-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredProduct.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                <>
                {query.length > 0 && (
                    <Combobox.Option 
                      value={{ id: null, name: query }}
                      className={`relative py-2 pl-10 pr-4 text-gray-400 font-semibold`}
                    >
                        searching for "{query}"
                    </Combobox.Option>
                )}

                {filteredProduct.map((product) => (
                  <Combobox.Option
                    key={product.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-green text-white' : 'text-gray-900'
                      }`
                    }
                    value={product}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                        <Link href={`/markethub/search/${product.name}`}>
                          {product.name}
                        </Link>
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))}
                </>
                )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </form>
  )
}

export default SearchBar