"use client"
import { AnimatePresence, motion } from "framer-motion";
import { ActivityIcon, BookOpen, FileClock, FileText, FileWarning, Home, ListChecks, LogOut, MessagesSquareIcon, PlaySquare, Settings, Speech, Store, Upload, UserIcon, Warehouse } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { PiCaretDown } from "react-icons/pi";
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/Ui/popover';
import useSettingsModal from "@/lib/hooks/useSettingsModal";
import { User } from "@prisma/client";
import { VscRequestChanges } from "react-icons/vsc";
import { useQuery } from "@tanstack/react-query";
import { fetchNumberOfConsignor } from "../../../../actions/community";

interface Props {
  user: User;
}

const Sidebar = ({ user }: Props) => {
  const [isDropdownrOpen, setIsDropdownrOpen] = useState(false);
  const [DropdownrOpen, setDropdownrOpen] = useState(false);
  const router = useRouter()

  const pathname = usePathname();
  const url = pathname.replace("/", "")

  const { onOpen } = useSettingsModal()

  const toggleDropdown = () => {
    setIsDropdownrOpen(!isDropdownrOpen);
  };

  const toggleDown = () => {
    setDropdownrOpen(!DropdownrOpen);
  };

  const {
    data: numberOfConsignor,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["consignor"],
    queryFn: async () => (await fetchNumberOfConsignor()) as number,
  })


  return (
    <>
      {user.role === "ADMIN" ? (
        <section className='max-w-[320px] hidden left-0 top-0 fixed py-3 px-11 h-screen border-r shadow-sm bg-[#7ef9bf] lg:flex print-card'>
          <div className='flex flex-col gap-3 justify-between'>
            <div>
              <Link href={"/discussion"}>
                <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
              </Link>
            </div>

            <div className='flex flex-col text-[16px] gap-2 mb-[350px] mt-11 '>
              <Link className='flex flex-row gap-3 hover:bg-pale py-2' href={"/employee"}>
                <Home strokeWidth={1} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>

              {user.role === "ADMIN" && (
                <Link href="/admin/manage-employees" className='flex flex-row gap-3 hover:bg-pale py-2'>
                  <UserIcon strokeWidth={1} />
                  <span className="text-sm font-medium">Staffs</span>
                </Link>
              )}

              <button
                type="button"
                onClick={toggleDropdown}
                className={`flex items-center gap-3 w-full py-2 "justify-start" : "justify-center"
              } hover:bg-pale`}
              >
                <div className="text-icons ">
                  <Upload strokeWidth={1} />
                </div>
                <div className='text-sm font-medium'>

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
              <button
                type="button"
                onClick={toggleDown}
                className={`flex items-center gap-3 w-full "justify-start" : "justify-center"
              } hover:bg-pale`}
              >
                <div className="text-icons ">
                  <Store strokeWidth={1} />
                </div>
                <div className="text-sm font-medium">

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
                        <Warehouse strokeWidth={1} />
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

              <Link href="/employee/reports"
                className='flex flex-row gap-3 hover:bg-pale py-2'>

                <FileWarning strokeWidth={1} />
                <span className="text-sm font-medium">
                  Issues
                </span>
              </Link>

              {user.role === "ADMIN" && (
                <>
                  <Link href="/admin/activity-logs" className='flex flex-row gap-3 hover:bg-pale py-2'>
                    <ActivityIcon strokeWidth={1} />
                    <span className="text-sm font-medium">Activity logs</span>

                  </Link>

                  <Link href="/admin/requests" className='relative flex flex-row gap-3 hover:bg-pale py-2'>
                    <VscRequestChanges />
                    <span className="text-sm font-medium">Requests</span>
                    <span className='absolute top-0 right-0 rounded-full w-5 h-5 text-center bg-red-600 text-white'>{numberOfConsignor}</span>
                  </Link>
                </>
              )}

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
        </section>
      ) : user.specialization === "MarketHub" ? (
        <section className='print-card max-w-[320px] hidden left-0 top-0 fixed py-3 px-11 h-screen border-r shadow-sm bg-[#7ef9bf] lg:flex'>
          <div className='flex flex-col gap-3 justify-between'>
            <div>
              <Link href={"/discussion"}>
                <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
              </Link>
            </div>

            <div className='flex flex-col text-[16px] gap-2 mb-[350px] mt-11 '>
              <Link className='flex flex-row gap-3 hover:bg-pale py-2' href={"/employee"}>
                <Home strokeWidth={1} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>

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
              <button
                type="button"
                onClick={toggleDown}
                className={`flex items-center gap-3 w-full "justify-start" : "justify-center"
              } hover:bg-pale`}
              >
                <div className="text-icons ">
                  <Store strokeWidth={1} />
                </div>
                <div className="text-sm font-medium">

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
                        <Warehouse strokeWidth={1} />
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
        </section>
      ) : (
        <section className='print-card max-w-[320px] hidden left-0 top-0 fixed py-3 px-11 h-screen border-r shadow-sm bg-[#7ef9bf] lg:flex'>
          <div className='flex flex-col gap-3 justify-between'>
            <div>
              <Link href={"/discussion"}>
                <h1 className='text-lg text-[#25643b] font-bold'>AGreen <span className='text-[#f7c25f]'>Nature</span> Connect</h1>
              </Link>
            </div>

            <div className='flex flex-col text-[16px] gap-2 mb-[350px] mt-11 '>
              <Link className='flex flex-row gap-3 hover:bg-pale py-2' href={"/employee"}>
                <Home strokeWidth={1} />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>

              {/* <button
                type="button"
                onClick={toggleDropdown}
                className={`flex items-center gap-3 w-full py-2 "justify-start" : "justify-center"
              } hover:bg-pale`}
              >
                <div className="text-icons ">
                  <Upload strokeWidth={1} />
                </div>
                <div className='text-sm font-medium'>

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
              </button> */}
              {/* <AnimatePresence>
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
              </AnimatePresence> */}

              <button
                type="button"
                onClick={toggleDown}
                className={`flex items-center gap-3 w-full "justify-start" : "justify-center"
              } hover:bg-pale`}
              >
                <div className="text-icons ">
                  <Store strokeWidth={1} />
                </div>
                <div className="text-sm font-medium">

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
                        <Warehouse strokeWidth={1} />
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

              {/* <Link href="/employee/reports"
                className='flex flex-row gap-3 hover:bg-pale py-2'>

                <FileWarning strokeWidth={1} />
                <span className="text-sm font-medium">
                  Issues
                </span>
              </Link> */}
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
        </section>
      )}

      <div className='w-full border-b shadow-md print-card'>
        <div className='grid grid-cols-10 p-3 items-center justify-center text-center lg:hidden bg-[#7ef9bf]'>

          <Link href="/employee" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "employee" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <Home strokeWidth={1} />
          </Link>
          {/* <Link href="/admin/manage-employees" className={`mx-auto text-neutral-500 p-2 m rounded-lg ${url === "admin/manage-employees" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <User strokeWidth={1} />
          </Link> */}
          {user.role === "ADMIN" && (
            <Link href="/admin/manage-employees" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/manage-employees" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
              <UserIcon strokeWidth={1} />
            </Link>
          )}
          <Link href="/employee/create-video" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "employee/create-video" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <PlaySquare strokeWidth={1} />
          </Link>
          <Link href="/employee/create-materials" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "employee/create-materials" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <BookOpen strokeWidth={1} />
          </Link>
          <Link href="/employee/create-blog" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "employee/create-blog" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <FileText strokeWidth={1} />
          </Link>

          <Link href="/employee/create-topic" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "employee/create-topic" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <Speech strokeWidth={1} />
          </Link>

          {/* <Link href="/admin/inventory" className={`mx-auto text-neutral-500 p-1 rounded-lg ${url === "admin/inventory" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`}>
            <Store strokeWidth={1} />
          </Link> */}

          <Popover>
            <PopoverTrigger asChild className={`mx-auto text-neutral-500 rounded-lg ${url === "employee/inventory" || url === "employee/history" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white p-1 w-[29px] h-[29px]" : "hover:bg-gray-200 text-black"}`}>
              <Store strokeWidth={1} />
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2'>

                <Link href="/employee/inventory" className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg`}>
                  <span className='text-sm font-medium'>Inventory</span>
                </Link>

                <Link href="/orders" className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg`}>
                  <span className='text-sm font-medium'>Order Status</span>
                </Link>

                <Link href="/employee/history" className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg`}>
                  <span className='text-sm font-medium'>Transaction History</span>
                </Link>


              </div>
            </PopoverContent>
          </Popover>

          <Link
            href="/employee/reports"
            className='mx-auto text-neutral-500 p-1 rounded-lg'
          >
            <FileWarning strokeWidth={1} />
          </Link>
          {user.role === "ADMIN" && (
            <Link href="/admin/activity-logs" className='mx-auto text-neutral-500 p-1 rounded-lg'>
              <ActivityIcon strokeWidth={1} />
            </Link>
          )}

          <Popover>
            <PopoverTrigger asChild className={`mx-auto text-neutral-500 rounded-lg ${url === "adminSettings" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white p-1 w-[29px] h-[29px]" : "hover:bg-gray-200 text-black"}`}>
              <Settings />
            </PopoverTrigger>
            <PopoverContent>
              <div className='space-y-2'>
                <div className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg ${url === "adminSettings" ? "bg-[#00B207] hover:bg-[#00B207]/80 text-white" : "hover:bg-gray-200 text-black"}`} onClick={onOpen}>
                  <span className='text-sm font-medium'>Settings</span>
                </div>

                <Link href="/employee/message" className="text-sm font-medium w-full flex items-center space-x-2 py-2 px-2 rounded-lg">
                  Messages
                </Link>

                <div className={`w-full flex items-center space-x-2 py-2 px-2 rounded-lg cursor-pointer hover:bg-gray-200 text-black`}
                  onClick={() => signOut({
                    redirect: false
                  }).then(() => {
                    router.push("/discussion")
                  })}>
                  <span className='text-sm font-medium'>Log Out</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  )
}

export default Sidebar