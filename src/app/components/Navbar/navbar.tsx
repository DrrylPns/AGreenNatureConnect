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
      className={`flex z-50 fixed top-0 items-center justify-between bg-white w-full h-[62px] px-4 sm:px-20 py-4 shadow transition-color duration-500 ${
        visible ? "" : "opacity-0"
      }`}
    >
      <Logo />
      {pathname === '/' ? (
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex w-1/5 justify-end"
      >
      
        <ul className="flex  flex-row justify-evenly w-[100%] m-10 max-lg:m-13 max-sm:hidden r-10 ">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("home")}
            className="text-black text-[16px] font-semibold p-3 m-3 hover:text-amber "
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
            className="text-black text-[16px] font-semibold p-3 m-3 hover:text-amber"
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
            className="text-black text-[16px] font-semibold p-3 m-3 hover:text-amber"
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
            className="text-black text-[16px] font-semibold p-3s max-md:mr-10 m-3 mr-28 hover:text-amber"
          >
            Contact
          </motion.button>
        </ul>
      </motion.div>

      ):(
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex w-1/5 justify-end"
      >
      
        <ul className="flex  flex-row justify-evenly w-[100%] m-10 max-lg:m-13 max-sm:hidden ">
          <Link href={'/'}>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("home")}
            className="text-black text-[16px] font-light p-3 m-3 hover:text-amber "
          >
            Home
          </motion.button>
          </Link>

          <Link href={'/'}>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("aboutus")}
            className="text-black text-[16px] font-light p-3 m-3 hover:text-amber"
          >
            About
          </motion.button>
          </Link>

          <Link href={'/'}>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("services")}
            className="text-black text-[16px] font-light p-3 m-3 hover:text-amber"
          >
            Services
          </motion.button>
          </Link>

          <Link href={'/'}>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("contactus")}
            className="text-black text-[16px] font-light p-3s max-md:mr-10 m-3 mr-28 mt-6 hover:text-amber"
          >
            Contact
          </motion.button>
          </Link>
        </ul>
      </motion.div>
      )}
      
      <motion.button
        className="sm:hidden text-black text-[2rem]"
        onClick={toggleMobileMenu}
      >
        <BiMenu />
      </motion.button>
      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed left-0 w-full top-[70px] h-[40%] bg-white/90 flex items-center justify-center shadow">
          <ul className="text-black text-[16px] font-poppins hover:text-amber lg-text-[16px] md-text-[14px] max-sm:text-[12px]">
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
          </ul>
        </div>
      )}
    </nav>
  );
}
