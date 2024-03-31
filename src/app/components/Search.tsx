"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiSearch } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { Combobox } from "@headlessui/react";
import { search } from "../../../actions/search";
import { Post, Product } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface suggestionProps {
  post: Post[]
  product: Product[] 
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [suggestion,setSuggestion] = useState<suggestionProps>()
  const router = useRouter()


  const handleSearch = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedTopic) {
      router.push(`/search/${selectedTopic}`);
    }
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const searchSuggestion = async () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const res = await axios.get(`/api/user/search?query=${query}`);
        setSuggestion(res.data);
      }, 1000);
    };
    searchSuggestion();
  }, [query]);


  const closeModal = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedTopic("");
  };

  const openModal = () => {
    setIsOpen(true);
    console.log(isOpen);
  };

  const topicList = suggestion
    ? suggestion.product.map((product) => product.name).concat(suggestion.post.map((post) => post.title))
    : [];
 
  const filteredTopics =
    query === ""
      ? topicList
      : topicList.filter((topic) => {
          return topic.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[80%] justify-end sm:justify-center"
    >
      <div className="hidden sm:block relative min-w-fit w-[50%]">
      <Combobox value={selectedTopic} onChange={setSelectedTopic}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className=" ui-focus-visible:ring-black ring-1 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={(topic: string) => topic}
              autoFocus={true}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute p-3 mt-1 h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredTopics && filteredTopics.length == 0 ? (
                    <>
                      <div className="absolute top-20 left-0 text-center w-full ">
                        <h1> Can't find related products or post title to "{query}"</h1>
                      </div>
                    </>
                  ) : (
                    <div className="">
                      <h1>Suggestions</h1>
                      {filteredTopics.map((topic, index) => (
                        <Link href={`/search/${topic}`} className="w-full">
                        <Combobox.Option
                          key={index}
                          value={topic}
                          className="text-start text-sm py-1 px-5 cursor-pointer border-b-gray-100 border-b-2  hover:bg-gray-100"
                        > 
                          {topic}
                        </Combobox.Option>
                        </Link>
                      ))}
                    </div>
                  )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      </div>
      {/**mobile view */}
      <button
        type="button"
        onClick={openModal}
        className="bg-white p-2 rounded-full sm:hidden "
      >
        <FiSearch />
      </button>
      <Dialog open={isOpen} onClose={closeModal}>
        <div className="absolute top-0 left-0 z-50 bg-white h-full w-full sm:hidden">
          <Dialog.Panel>
            <div className="flex justify-between items-center px-4 py-3 gap-5 border-b border-gray-500">
              <button type="button" onClick={closeModal}>
                <BiArrowBack />
              </button>
              <Combobox value={selectedTopic} onChange={setSelectedTopic}>
                <Transition
                  as="div"
                  show={isOpen}
                  enter="transform transition duration-400"
                  enterFrom="opacity-0 rotate-[-120deg] scale-50"
                  enterTo="opacity-100 rotate-0 scale-100"
                  leave="transform duration-200 transition ease-in-out"
                  leaveFrom="opacity-100 rotate-0 scale-100 "
                  leaveTo="opacity-0 scale-95 "
                  className="w-full"
                >
                  <Combobox.Input
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={(topic: string) => topic}
                    className="w-full rounded-lg px-3 py-2 bg-[#F0EEF6]"
                    autoFocus={true}
                  />
                </Transition>

                <Combobox.Options>
                  {filteredTopics && filteredTopics.length == 0 ? (
                    <>
                      <div className="absolute top-20 left-0 text-center w-full ">
                        <h1> Can't find related topics to "{query}"</h1>
                      </div>
                    </>
                  ) : (
                    <div className="absolute top-20 left-0 text-center w-full overflow-auto h-full pb-[20%] ">
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
  );
}
