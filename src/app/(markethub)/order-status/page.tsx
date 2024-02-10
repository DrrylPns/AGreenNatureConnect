'use client'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'

function page() {
    const [selectedIndex, setSelectedIndex] = useState(0)
  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className='w-full bg-green px-5 py-3'>
            <h1 className='text-white font-poppins font-bold text-[1.5rem]'>My order</h1>
        </div>
        <Tab.List>
            <Tab className="text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Orders
            </Tab>
            <Tab className="text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Approved
            </Tab>
            <Tab className="text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Pick Up
            </Tab>
            <Tab className="text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Completed
            </Tab>
            <Tab className="text-[1.5rem] font-poppins font-semibold leading-10 border-b-[5px] outline-none ui-selected:border-b-green transition-all ease-in-out duration-1000 w-1/5 py-3 px-4">
                Cancelled
            </Tab>
        </Tab.List>
        <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
            <Tab.Panel>Content 4</Tab.Panel>
            <Tab.Panel>Content 5</Tab.Panel>
        </Tab.Panels>
    </Tab.Group>
  )
}

export default page