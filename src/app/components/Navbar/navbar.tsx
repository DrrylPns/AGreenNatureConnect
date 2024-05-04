"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import Logo from "../Logo/logo";
import { usePathname } from "next/navigation";
import Link from "next/link";



export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const pathname = usePathname();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`h-[3.5rem] flex z-50 fixed top-0 items-center justify-between w-full pl-10 bg-white shadow transition-color duration-500 ${
        visible ? "" : "opacity-0"
      }`}
    >
      <Logo />
      {pathname === "/" ? (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <ul className="flex flex-row justify-evenly max-sm:hidden ">
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection("home")}
              className="text-black text-[16px] font-semibold m-3 hover:text-amber "
            >
              Home
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection("aboutus")}
              className="text-black text-[16px] font-semibold m-3 hover:text-amber"
            >
              About
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection("services")}
              className="text-black text-[16px] font-semibold m-3 hover:text-amber"
            >
              Services
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollToSection("contactus")}
              className="text-black text-[16px] font-semibold max-md:mr-10 m-3 mr-14 hover:text-amber"
            >
              Contact
            </motion.button>

            <Link href={"/discussion"} className=" text-white mr-6">
              <button className="my-3 h-10 w-[8rem] bg-[#307047] rounded-md hover:bg-[#24643B]  hover:text-white focus:ring ring-offset-2 ring-[#449a64] focus:outline-none transition duration-150 ease-in-out">
                Get Started
              </button>
            </Link>
          </ul>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-end"
        >
          <ul className="flex  flex-row justify-evenly max-sm:hidden ">
          <Link href={"/"}>
                <motion.button
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scrollToSection("aboutus")}
                    className="text-black text-[16px] font-semibold m-3 hover:text-amber "
                  >
                    Home
                  </motion.button>
            </Link>
            
            <Link href={"/"}>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollToSection("aboutus")}
                  className="text-black text-[16px] font-semibold m-3 hover:text-amber"
                >
                  About
                </motion.button>
            </Link>
            
            <Link href={"/"}>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollToSection("services")}
                  className="text-black text-[16px] font-semibold m-3 hover:text-amber"
                >
                  Services
                </motion.button>
            </Link>

            <Link href={"/"}>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => scrollToSection("contactus")}
                  className="text-black text-[16px] font-semibold max-md:mr-10 m-3 mr-14 hover:text-amber"
                >
                  Contact
                </motion.button>
            </Link>
            

            <Link href={"/discussion"} className=" text-white mr-6">
              <button className="my-3 h-10 w-[8rem] bg-[#307047] rounded-md">
                Get Started
              </button>
            </Link>
          </ul>
        </motion.div>
      )}

      <motion.button
        className="mr-10 sm:hidden text-black text-[2rem]"
        onClick={toggleMobileMenu}
      >
        <BiMenu />
      </motion.button>
      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed left-0 w-full top-[55px] h-[40%] bg-white/90 flex items-center justify-center shadow">
          <ul className="flex-row items-center justify-center text-black text-[20px] font-poppins hover:text-amber max-sm:text-[20px]">
            <li
              className=""
              onClick={() => {
                scrollToSection("home");
                toggleMobileMenu();
              }}
            >
              Home
            </li>
            <li
              className="my-5"
              onClick={() => {
                scrollToSection("aboutus");
                toggleMobileMenu();
              }}
            >
              About
            </li>
            <li
              className="my-5"
              onClick={() => {
                scrollToSection("services");
                toggleMobileMenu();
              }}
            >
              Services
            </li>
            <li
              className="my-5"
              onClick={() => {
                scrollToSection("contactus");
                toggleMobileMenu();
              }}
            >
              Contact
            </li>
            <Link href={"/discussion"} className=" text-white">
              <button className="my-3 h-10 w-[8rem] bg-[#307047] rounded-md hover:bg-[#24643B]  hover:text-white focus:ring ring-offset-2 ring-[#449a64] focus:outline-none transition duration-150 ease-in-out">
                Get Started
              </button>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
