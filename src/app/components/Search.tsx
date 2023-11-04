'use client'
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FiSearch } from "react-icons/fi"
import { BiArrowBack } from 'react-icons/bi';
import { Combobox } from '@headlessui/react'
export default function Search() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selectedTopic, setSelectedTopic] = useState('')

    const handleSearch = () => {

    }
    const closeModal = () => {
        setIsOpen(false)
        setQuery('')
        setSelectedTopic('')
    }

    const openModal = () => {
        setIsOpen(true)
        console.log(isOpen)
    }
    const urbanFarmingTopics = [
        "Soil Health",
        "Composting",
        "Raised Beds",
        "Container Gardening",
        "Vegetables",
        "Herbs",
        "Fruits",
        "Microgreens",
        "Hydroponics",
        "Aquaponics",
        "Vertical Farming",
        "Permaculture",
        "Rainwater Harvesting",
        "Solar Power",
        "Waste Management",
        "Sustainable Practices",
        "Community Gardens",
        "Education Programs",
        "Food Sharing",
        "Collaborative Initiatives",
    ];

    const filteredTopics =
        query === ''
            ? urbanFarmingTopics
            : urbanFarmingTopics.filter((topic) => {
                return topic.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <form onSubmit={handleSearch} className='flex w-[80%] justify-end sm:justify-center'>
            <div className="hidden sm:block relative min-w-fit w-[50%]">
                <input type="text" placeholder="Search for people" className='hidden rounded-full w-full pl-10 py-1 bg-white sm:block' />
                <div className="hidden absolute top-2 left-3 sm:block">
                    <FiSearch />
                </div>
            </div >
            {/**mobile view */}
            <button
                type="button"
                onClick={openModal}
                className="bg-white p-2 rounded-full sm:hidden ">
                <FiSearch />
            </button>
            <Dialog open={isOpen} onClose={closeModal}>
                <div className="absolute top-0 left-0 z-50 bg-white h-full w-full sm:hidden">
                    <Dialog.Panel>
                        <div className='flex justify-between items-center px-4 py-3 gap-5 border-b border-gray-500'>
                            <button type='button' onClick={closeModal}>
                                <BiArrowBack />
                            </button>
                            <Combobox value={selectedTopic} onChange={setSelectedTopic}>
                                <Transition
                                    as='div'
                                    show={isOpen}
                                    enter="transform transition duration-400"
                                    enterFrom="opacity-0 rotate-[-120deg] scale-50"
                                    enterTo="opacity-100 rotate-0 scale-100"
                                    leave="transform duration-200 transition ease-in-out"
                                    leaveFrom="opacity-100 rotate-0 scale-100 "
                                    leaveTo="opacity-0 scale-95 "
                                    className='w-full'
                                >
                                    <Combobox.Input
                                        onChange={(e) => setQuery(e.target.value)}
                                        displayValue={(topic: string) => topic}
                                        className='w-full rounded-lg px-3 py-2 bg-[#F0EEF6]'
                                        autoFocus={true}
                                    />
                                </Transition>

                                <Combobox.Options>
                                    {filteredTopics.length == 0 ? (
                                        <>
                                            <div className='absolute top-20 left-0 text-center w-full '>
                                                <h1> Can't find related topics to "{query}"</h1>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='absolute top-20 left-0 text-center w-full overflow-auto h-full pb-[20%] '>
                                            {filteredTopics.map((topic, index) => (
                                                <Combobox.Option
                                                    key={index}
                                                    value={topic}
                                                    className="text-start py-2 px-5 border-b border-gray-400 hover:bg-gray-400"
                                                >

                                                    {topic}
                                                </Combobox.Option>
                                            ))}
                                        </div>
                                    )}
                                </Combobox.Options>
                            </Combobox>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </form>
    )
}
