"use client";

import React from "react";
import { motion } from "framer-motion";
import Logo from "../Logo/logo";
import { useState, useEffect } from "react";

export default function navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  return (
    <nav
      className={`flex z-50 fixed top-0 left-0 items-center justify-between bg-black w-full h-[70px] px-4 sm:px-20 py-3 shadow transition-color duration-500 ${
        visible ? "" : "opacity-0"
      }`}
    >
      <Logo />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex w-1/2 justify-end"
      >
        <ul className="hidden lg:flex flex-row justify-evenly w-3/4">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("home")}
            className="text-white text-sm font-poppins p-1"
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
            className="text-white text-sm font-poppins p-1"
          >
            About Us
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("services")}
            className="text-white text-sm font-poppins p-1"
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
            className="text-white text-sm font-poppins p-1"
          >
            Contact Us
          </motion.button>
        </ul>
      </motion.div>
    </nav>
  );
}
