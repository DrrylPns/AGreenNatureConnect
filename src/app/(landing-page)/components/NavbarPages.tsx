"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiMenu } from "react-icons/bi";
import Logo from "@/app/components/Logo/logo";

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
      ></motion.div>
    </nav>
  );
}
