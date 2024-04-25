"use client"
import { BookOpen, FileClock, FileText, FileWarning, History, Home, ListChecks, LogOut, PlaySquare, Speech, Store, Upload, Warehouse } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDown } from "react-icons/pi";
import { LiaBookReaderSolid } from "react-icons/lia";
import { BsClipboardPlus } from 'react-icons/bs';


// interface SidebarProps {
//     name: string | undefined;
// }

const Sidebar = ({
  // name
}) => {
  const router = useRouter()
  const [isDropdownrOpen, setIsDropdownrOpen] = useState(false);
  const [DropdownrOpen, setDropdownrOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownrOpen(!isDropdownrOpen);
  };

  const toggleDown = () => {
    setDropdownrOpen(!DropdownrOpen);
  };


  const pathname = usePathname();

  return (
    <section className='max-w-[320px] flex left-0 top-0 fixed py-3 px-11 h-screen border-r shadow-sm bg-[#7ef9bf]'>
      <div className='flex flex-col gap-3 justify-between'>
        {/* <div>
          <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
          <h1 className='text-lg'>{name} Community Dashboard</h1>
        </div> */}
        <div>
          <Link href={"/discussion"}>
            <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
          </Link>
        </div>

        

        <div className='flex flex-col text-[16px] gap-2 mb-[350px] mt-11 '>
          <Link className='flex flex-row gap-3 hover:bg-pale py-2' href={"/employee"}>
            <Home strokeWidth={1} />
            Dashboard
          </Link>

          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex items-center gap-3 w-full py-2 "justify-start" : "justify-center"
              } hover:bg-pale`}
          >
            <div className="text-icons ">
            <Upload strokeWidth={1} />
            </div>
            <div className='text-[15px]'>
              
                Information Section
          
            </div>
            <div
              className={`font-poppins text-[1rem] "opacity-100 block self-end"
                  : "opacity-0 hidden"
                }`}
            >
              <div className="text-icons">
                <PiCaretDown />
              </div>
            </div>
          </button>
          <AnimatePresence>
            {isDropdownrOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  stiffness: 100,
                  damping: 20,
                  duration: 0.2,
                  delay: 0.5,
                }}
                exit={{ opacity: 0, y: -50 }}
              >
                <Link
                  href={"/employee/create-video"}
                  className={`link ${pathname === "/employee/create-video"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-[1.5rem]">
                  <PlaySquare strokeWidth={1} />
                  </div>
                  Video Tutorial
                </Link>
                <Link
                  href={"/employee/create-materials"}
                  className={`link ${pathname === "/employee/create-materials"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-icons">
                  <BookOpen strokeWidth={1} />
                  </div>
                  Learning Materials
                </Link>
                <Link
                  href={"/employee/create-blog"}
                  className={`link ${pathname === "/employee/create-blog"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-[1.5rem]">
                  <FileText strokeWidth={1} />
                  </div>
                  Blogs
                </Link>
                <Link
                  href={"/employee/create-topic"}
                  className={`link ${pathname === "/employee/create-topic"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-[1.5rem]">
                  <Speech strokeWidth={1} />
                  </div>
                  Topics
                </Link>
                
              </motion.div>
            )}
          </AnimatePresence>


{/*}

          <Link href="/employee/create-video"
            className='flex flex-row gap-3'>
            <PlaySquare strokeWidth={1} />
            Video Tutorial
          </Link>
          
          <Link href="/employee/create-materials"
            className='flex flex-row gap-3'>
            <BookOpen strokeWidth={1} />
            Learning Material
          
            </Link>
*/}
          {/* <Link href="#">Blog</Link> */}
          {/* <Link href="/employee/create-products">Create Products</Link> */}

{/* 
          <Link href="/employee/create-blog"
            className='flex flex-row gap-3'>
            <FileText strokeWidth={1} />
            Blog
          </Link>

          <Link href="/employee/create-topic"
            className='flex flex-row gap-3'>
            <Speech strokeWidth={1} />
            Topics
          </Link>
*/}


<button
            type="button"
            onClick={toggleDown}
            className={`flex items-center gap-3 w-full "justify-start" : "justify-center"
              } hover:bg-pale`}
          >
            <div className="text-icons ">
            <Store strokeWidth={1} />
            </div>
            <div>
              
            Market Hub
          
            </div>
            <div
              className={`font-poppins text-[1rem] "opacity-100 block self-end"
                  : "opacity-0 hidden"
                }`}
            >
              <div className="text-icons ml-12">
                <PiCaretDown />
              </div>
            </div>
          </button>
          <AnimatePresence>
            {DropdownrOpen && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  stiffness: 100,
                  damping: 20,
                  duration: 0.2,
                  delay: 0.5,
                }}
                exit={{ opacity: 0, y: -50 }}
              >
                <Link
                  href={"/employee/inventory"}
                  className={`link ${pathname === "/employee/inventory"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-[1.5rem]">
                  <Warehouse strokeWidth={1}/>
                  </div>
                  Inventory
                </Link>
                <Link
                  href={"/orders"}
                  className={`link ${pathname === "/orders"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-icons">
                  <ListChecks strokeWidth={1} />
                  </div>
                  Orders Status
                </Link>
                <Link
                  href={"/employee/history"}
                  className={`link ${pathname === "/employee/history"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                    }
                  flex gap-3 ml-5 hover:bg-pale py-2`}
                >
                  <div className="text-[1.5rem]">
                  <FileClock strokeWidth={1} />
                  </div>
                  Transaction History
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

{/* 
          <Link href="/employee/inventory"
            className='flex flex-row gap-3'>
            <Store strokeWidth={1} />
            Market Hub
          </Link>

          <Link href="/orders"
            className='flex flex-row gap-3'>
            <ListChecks strokeWidth={1} />
            Orders Status
          </Link>

          <Link href="/employee/history"
            className='flex flex-row gap-3'>
            <FileClock strokeWidth={1} />
            Transaction History
          </Link>
*/}

          <Link href="/employee/reports"
            className='flex flex-row gap-3 hover:bg-pale py-2'>
            
            <FileWarning strokeWidth={1} />
            Issues
          </Link>
{/* 
          <Link href=""
            className='flex flex-row gap-3 hover:bg-pale py-2'>
            <History strokeWidth={1} />
            History
          </Link>
*/}


        </div>


        <div className='mb-[30px] flex flex-row gap-3 cursor-pointer' onClick={() => signOut({
          redirect: false
        }).then(() => {
          router.push("/discussion")
        })}>
          <LogOut strokeWidth={1} />
          Logout
        </div>

      </div>
    </section >
  )
}

export default Sidebar