'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Curve from '/public/images/curve.png'
import Footer from '@/app/components/Footer/footer'
export default function TermsPolicy() {
  const [text, setText] = useState('')
  const showTermsConditions = () => {
    setText('Terms&Condition')
  }
  const showPrivacyPolicy = () => {
    setText('PrivacyPolicy')
  }
  return (
    <div className='max-sm:max-w-max'>
      <header className='relative px-20 md:pt-32 max-sm:pt-14 max-sm:pl-5 pb-8 flex justify-start bg-gradient-to-r from-[#2D5F4D] to-[#2D5F4D80] border-b-[7px] border-black'>
        <div className='text-center max-sm:mt-9'>
          <h1 className='font-poppins font-bold md:text-[30px] max-sm:text-[5x1]'>AGreen Nature Connect</h1>
          <h1 className='font-poppins font-bold md:text-[30px] max-sm:text-[5x1] max-sm:pb-6 pb-12'>Terms & Conditions</h1>
        </div>
        <div className='absolute md:top-[12.9rem] lg:top-[11.6rem] max-sm:top-[10.1rem] left-0 w-full'>
          <Image
            src={Curve}
            alt=''
          />
        </div>
      </header>

      <div className='text-justify font-serif md:text-[15px] max-sm:text-[10px] md:py-20 max-sm:py-5  max-sm:px-5 px-40'>
            <p className='font-bold'>TERMS & CONDITIONS</p><br/>
            <p className='font-semibold'>Acceptance of Terms</p>
            <p>By accessing or using Agreen-Connect, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, you may not use the website.</p><br/>
            <p className='font-semibold'>Discussion Forum</p>
            <p>Our website hosts a discussion forum where users can engage in conversations related to urban farming. Users can react to posts using various reactions. While participating in the forum, users must adhere to the following guidelines:</p><br/>
            <p>-Respect other users and their opinions.</p>
            <p>-Avoid posting offensive, abusive, or inappropriate content.</p>
            <p>-Do not engage in spamming or promotional activities unrelated to urban farming.</p>
            <p>-Agreen Nature Connect reserves the right to moderate and remove any content that violates these guidelines.</p><br/>
            <p className='font-semibold'>Information Forum</p>
            <p>We provide an information forum featuring video tutorials on planting and other relevant topics. Users can access and utilize these resources for educational purposes.</p><br/>
            <p>- Blogs</p>
            <p>Beneficiaries of Agreen-Connect have the opportunity to share their experiences, insights through blogs and make an update on their community status. While posting blogs, users must ensure that the content is relevant to urban farming and does not violate any laws or regulations. Agreen Nature Connect reserves the right to remove any blog that breaches these terms.</p><br/>
            <p>- Learning Materials and Articles</p><br/>
            <p className='font-semibold'>MarketHub</p>
            <p>The Market Hub enables users to buy crops from our beneficiaries and allows beneficiaries to sell their crops. Users engaging in transactions through the Market Hub must adhere to the following guidelines:</p>
            <p>- Negotiate and agree upon delivery or pickup arrangements directly with the beneficiary.</p>
            <p>- Provide accurate information when buying crops.</p>
            <p>- Respect the terms set by sellers regarding payment, delivery, and product quality.</p>
            <p>- Agreen Nature Connect is not responsible for coordinating or facilitating delivery arrangements and is not liable for any issues arising from the delivery process.</p><br/>
            <p className='font-semibold'>Limitation of Liability</p>
            <p>Agreen Nature Connect is not liable for any damages or losses resulting from the use of the website or the inability to access it. We do not guarantee the accuracy or completeness of the information provided on the website.</p><br/>
            <p className='font-semibold'>Modification of Terms</p>
            <p>Agreen Nature Connect reserves the right to modify these terms and conditions at any time without prior notice. Users are responsible for regularly reviewing the terms to stay informed of any changes.</p><br/>
            
            <p>By using Agreen Nature Connect, you acknowledge that you have read, understood, and agree to abide by these terms and conditions.</p><br/>
            
            <p>If you have any questions or concerns regarding these terms, please contact us at ✉️natureagreen@gmail.com</p><br/>
          </div>
      
      <Footer />
    </div>
  )
}