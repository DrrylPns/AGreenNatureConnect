"use client";
import React, { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BiMenu,
  BiArrowBack,
  BiHome,
  BiStore,
  BiInfoCircle,
} from "react-icons/bi";
import { PiUsersThree, PiCaretDown } from "react-icons/pi";
import { LiaBookReaderSolid, LiaBlogger } from "react-icons/lia";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineQuestionCircle, AiOutlineFileProtect } from "react-icons/ai";
import { LuFileSignature } from "react-icons/lu";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Logo from "./Logo/logo";
import UserAccountAvatar from "./UserAccountAvatar";
import { signOut, useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import useLoginModal from "@/lib/hooks/useLoginModal";
import { MdOutlineArticle } from "react-icons/md";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { ThemeToggler } from "./ThemeToggler";

export default function SIdebar() {
  const { data: session, status } = useSession();
  const loginModal = useLoginModal();
  const [isShowing, setIsShowing] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isDropdownrOpen, setIsDropdownrOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    setIsShowing(!isShowing);
  };

  const toggleDropdown = () => {
    if (!isSideBarOpen) {
      setIsSideBarOpen(!isSideBarOpen);
    }
    setIsDropdownrOpen(!isDropdownrOpen);
  };

  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="z-50">
        {/**mobile view */}
        <div className="fixed w-full z-20 md:relative">
          {/**Home, Communities, Markethub Icons and links */}
          <div className="pt-[5rem] w-full flex justify-around bg-white dark:bg-[#242526] md:hidden shadow-md drop-shadow-md">
            <Link
              className={`link ${
                pathname === "/discussion" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/discussion"}
            >
              <div className="text-icons ">
                <BiHome />
              </div>
            </Link>

            <Link
              className={`link ${
                pathname === "/videotutorial" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/videotutorial"}
            >
              <div className="text-[1.5rem]">
                <MdOutlineSlowMotionVideo />
              </div>
            </Link>
            
            <Link
              className={`link ${
                pathname === "/learningMaterials" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/learningMaterials"}
            >
              <div className="text-icons">
                <SlNotebook />
              </div>
            </Link>
            
            <Link
              className={`link ${
                pathname === "/blogs" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/blogs"}
            >
              <div className="text-[1.5rem]">
                <LiaBlogger />
              </div>
            </Link>
            
            <Link
              className={`link ${
                pathname === "/article" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/article"}
            >
              <div className="text-[1.5rem]">
                <MdOutlineArticle />
              </div>
            </Link>
            <Link
              className={`link ${
                pathname === "/markethub" ? "border-b-2 border-yellow-400" : ""
              } flex justify-center items-center  w-full py-3`}
              href={"/markethub"}
            >
              <div className="text-icons ">
                <BiStore />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/**desktop view */}
      <motion.div
        initial={{ width: "10%" }} // Initial width when sidebar is open
        animate={{ width: isSideBarOpen ? "20%" : "10%" }} // Animate width to 0 when collapsed
        transition={{
          type: "tween",
          duration: 1,
        }}
        className={`md:flex md:pt-[6rem]  hidden fixed flex-col drop-shadow-lg shadow-lg pt-4 pb-5 px-5 bg-white dark:bg-[#242526] h-full w-[5%] ${
          isSideBarOpen ? "items-start" : "items-center"
        } z-30`}
      >
        <button type="button" onClick={toggleSideBar} className="text-center">
          <Logo />
        </button>
        <button
          onClick={toggleSideBar}
          className={`${isSideBarOpen && "self-end"}`}
        >
          {isSideBarOpen ? (
            <div className="text-icons ">
              <BiArrowBack />
            </div>
          ) : (
            <div className="text-icons ">
              <BiMenu />
            </div>
          )}
        </button>
        {/**Home, Communities, Markethub Icons and links */}
        <div className="flex flex-col items-start w-full">
          <Link
            href={"/discussion"}
            className={`link ${
              pathname === "/discussion"
                ? "border-l-[3px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                : ""
            } flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <BiHome />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                className={`font-poppins text-[1rem] `}
              >
                Home
              </motion.p>
            </div>
          </Link>
          <button
            type="button"
            onClick={toggleDropdown}
            className={`flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <LiaBookReaderSolid />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                className={`font-poppins text-[1rem]`}
              >
                Read & Learn
              </motion.p>
            </div>
            <div
              className={`font-poppins text-[1rem] ${
                isSideBarOpen
                  ? "opacity-100 block self-end"
                  : "opacity-0 hidden"
              }`}
            >
              <div className="text-icons ">
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
                className={`${!isSideBarOpen && "hidden"} ${
                  isDropdownrOpen ? "flex" : "hidden"
                } flex-col `}
              >
                <Link
                  href={"/videotutorial"}
                  className={`link ${
                    pathname === "/videotutorial"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                  }
                  flex gap-3 ml-5 py-2`}
                >
                  <div className="text-[1.5rem]">
                    <MdOutlineSlowMotionVideo />
                  </div>
                  Video Tutorial
                </Link>
                <Link
                  href={"/learningMaterials"}
                  className={`link ${
                    pathname === "/learningMaterials"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                  }
                  flex gap-3 ml-5 py-2`}
                >
                  <div className="text-icons">
                    <SlNotebook />
                  </div>
                  Learning Materials
                </Link>
                <Link
                  href={"/blogs"}
                  className={`link ${
                    pathname === "/blogs"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                  }
                  flex gap-3 ml-5 py-2`}
                >
                  <div className="text-[1.5rem]">
                    <LiaBlogger />
                  </div>
                  Blogs
                </Link>
                <Link
                  href={"/article"}
                  className={`link ${
                    pathname === "/article"
                      ? "border-l-[4px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                      : ""
                  }
                  flex gap-3 ml-5 py-2`}
                >
                  <div className="text-[1.5rem]">
                    <MdOutlineArticle />
                  </div>
                  Articles
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <Link
            href={"/markethub"}
            className={`link ${
              pathname === "/markethub"
                ? "border-l-[3px] border-[#4DE69E] bg-[#baebd4] dark:bg-[#24643b]"
                : ""
            } flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale `}
          >
            <div className="text-icons ">
              <BiStore />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                className={`font-poppins text-[1rem]`}
              >
                Markethub
              </motion.p>
            </div>
          </Link>
          <Link
            href={""}
            className={`flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <BiInfoCircle />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                style={{ display: isSideBarOpen ? "block" : "none" }}
                className={`font-poppins text-[1rem]`}
              >
                About
              </motion.p>
            </div>
          </Link>
          <Link
            href={""}
            className={`flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <AiOutlineQuestionCircle />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                style={{ display: isSideBarOpen ? "block" : "none" }}
                className={`font-poppins text-[1rem]`}
              >
                Help
              </motion.p>
            </div>
          </Link>
          <Link
            href={"/termsPolicy"}
            className={`flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <AiOutlineFileProtect />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                style={{ display: isSideBarOpen ? "block" : "none" }}
                className={`font-poppins text-[1rem] line-clamp-1`}
              >
                Privacy Policy
              </motion.p>
            </div>
          </Link>
          <Link
            href={"/termsPolicy"}
            className={`flex items-center gap-4 w-full py-2 ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <div className="text-icons ">
              <LuFileSignature />
            </div>
            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                style={{ display: isSideBarOpen ? "block" : "none" }}
                className={`font-poppins text-[1rem] line-clamp-1`}
              >
                User Agreement
              </motion.p>
            </div>
          </Link>
          <div
            className={`flex items-center gap-4 w-full py-2 cursor-pointer ${
              isSideBarOpen ? "justify-start" : "justify-center"
            } hover:bg-pale`}
          >
            <ThemeToggler />

            <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                transition={{
                  type: "tween",
                  stiffness: 1000,
                  damping: 20,
                  duration: 0.6,
                  delay: 0.5,
                }}
                style={{ display: isSideBarOpen ? "block" : "none" }}
                className={`font-poppins text-[1rem] line-clamp-1`}
              >
                Themes
              </motion.p>
            </div>
          </div>
        </div>
        {status === "authenticated" ? (
          <>
            <div className="flex mt-auto justify-between gap-2">
              <UserAccountAvatar />
              {isSideBarOpen && (
                <div className={`${isSideBarOpen ? "block" : "hidden"}`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isSideBarOpen ? 1 : 0 }} // Target values (opacity: 1, translateY: 0)
                    transition={{
                      type: "tween",
                      stiffness: 1000,
                      damping: 20,
                      duration: 0.6,
                      delay: 0.5,
                    }}
                    style={{ display: isSideBarOpen ? "block" : "none" }}
                    className={`text-sm font-semibold font-poppins`}
                  >
                    <div>{session?.user.username}</div>
                    <div className="text-xs text-gray-400 font-poppins">
                      {session?.user.email}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
            {isSideBarOpen && (
              <button
                type="button"
                onClick={() => signOut()}
                className="w-full border border-black mt-3 flex justify-center items-center text-[1rem]"
              >
                <RiLogoutBoxLine />
                <span>Logout</span>
              </button>
            )}
          </>
        ) : (
          <>
            {isSideBarOpen && (
              <button
                onClick={loginModal.onOpen}
                className="w-full mt-auto text-white py-3 bg-green"
              >
                Signin
              </button>
            )}
          </>
        )}
      </motion.div>
    </>
  );
}
