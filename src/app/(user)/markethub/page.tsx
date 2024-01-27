import React, { useState } from "react";
import Carousel from "./components/Carousel";
import { BiCaretDown } from "react-icons/bi";
import Card from "./components/Card";
import Free from "./components/Free";
import Pechay from './images/Pechay.png';
import Sili from './images/Sili(Labuyo).png';
import Talong from './images/Talong.png';
import Calamansi from './images/Calamansi.png';
import Carrots from './images/Carrots.png';
import Banana from './images/Banana.png';
import Apple from './images/Apple.png';
import Orange from './images/Orange.png';
import Guyabano from './images/Guyabano.png';
import Dalandan from './images/Dalandan.png';
import Product from "./components/Product";

export default function Markethub() {

  return (
    <div className="pt-[8rem] md:pt-[6rem] sm:px-[3%] md:pl-[8%] z-0 bg-[#F0EEF6] px-3">
        <Carousel/>
        <h1 className="text-lg font-poppins font-semibold my-5">Discover</h1>
        <button className="flex justify-between items-center bg-[#4DE69E] rounded-lg px-4 py-1 mb-5 font-poppins font-medium text-sm">
          <span>Barangay</span>
          <BiCaretDown/>
        </button>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-poppins font-medium ">
          {/*<Card imageUrl={Pechay} productName={'Pechay'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Sili} productName={'Sili (Labuyo)'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Talong} productName={'Talong'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Calamansi} productName={'Calamansi'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Carrots} productName={'Carrots'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Banana} productName={'Banana'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Orange} productName={'Orange'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Apple} productName={'Apple'} barangay={"Barangay Bagbag"}/>
          <Card imageUrl={Guyabano} productName={'Guyabano'} barangay={"Barangay Bagbag"}/>
  <Card imageUrl={Dalandan} productName={'Dalandan'} barangay={"Barangay Bagbag"}/>? */}
         
        </div>
        <Product />
    </div>
  );
}
