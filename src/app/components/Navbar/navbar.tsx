"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import Logo from "../Logo/logo";

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
      className={`flex z-50 fixed top-0 left-0 items-center justify-between bg-black w-full h-[70px] px-4 sm:px-20 py-4 shadow transition-color duration-500 ${
        visible ? "" : "opacity-0"
      }`}
    >
      <Logo />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex w-1/5 justify-end"
      >
        <ul className="flex  flex-row justify-evenly w-[100%] m-10 max-lg:m-13 max-sm:hidden ">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("home")}
            className="text-white text-[18px] font-poppins p-2 m-1"
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
            className="text-white text-[18px] font-poppins p-2 m-1"
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
            className="text-white text-[18px] font-poppins p-2 m-1"
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
            className="text-white text-[18px] font-poppins p-1 max-md:mr-10"
          >
            Contact
          </motion.button>
        </ul>
      </motion.div>
      <motion.button
        className="sm:hidden text-white text-[2rem]"
        onClick={toggleMobileMenu}
      >
        <BiMenu />
      </motion.button>
      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-[60px] left-0 w-full h-[50%] bg-black flex items-center justify-center shadow">
          <ul className="text-white text-[30px] font-poppins">
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
