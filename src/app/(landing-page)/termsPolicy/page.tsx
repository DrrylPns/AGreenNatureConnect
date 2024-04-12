'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Curve from '/public/images/curve.png'
import Footer from '@/app/components/Footer/footer'
import Back from '../components/Back';
import Link from 'next/link'
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



      <div className="max-w-4xl mx-auto mb-10 mt-3 p-8 bg-white shadow-lg rounded-lg">
      
        <div className=' mt-3 hidden sm:block md:block'> 
        <Back/>
        </div>
        <h1 className="text-3xl font-bold mb-6">TERMS & CONDITIONS</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
          <p>
            By accessing or using Agreen-Connect, you agree to comply with and be bound by these terms and conditions. If
            you do not agree with any part of these terms, you may not use the website.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Discussion Forum</h2>
          <p>
            Our website hosts a discussion forum where users can engage in conversations related to urban farming. Users
            can react to posts using various reactions. While participating in the forum, users must adhere to the
            following guidelines:
          </p>
          <ul className="list-disc pl-5">
            <li>Respect other users and their opinions.</li>
            <li>Avoid posting offensive, abusive, or inappropriate content.</li>
            <li>Do not engage in spamming or promotional activities unrelated to urban farming.</li>
            <li>
              Agreen Nature Connect reserves the right to moderate and remove any content that violates these guidelines.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Information Forum</h2>
          <p>
            We provide an information forum featuring video tutorials on planting and other relevant topics. Users can
            access and utilize these resources for educational purposes.
          </p>
          <h3 className="text-xl font-semibold mt-4">- Blogs</h3>
          <p>
            Beneficiaries of Agreen-Connect have the opportunity to share their experiences, insights through blogs and
            make an update on their community status. While posting blogs, users must ensure that the content is relevant
            to urban farming and does not violate any laws or regulations. Agreen Nature Connect reserves the right to
            remove any blog that breaches these terms.
          </p>
          <h3 className="text-xl font-semibold mt-4">- Learning Materials and Articles</h3>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">MarketHub</h2>
          <p>
            The Market Hub enables users to buy crops from our beneficiaries and allows beneficiaries to sell their crops.
            Users engaging in transactions through the Market Hub must adhere to the following guidelines:
          </p>
          <ul className="list-disc pl-5">
            <li>Negotiate and agree upon delivery or pickup arrangements directly with the beneficiary.</li>
            <li>Provide accurate information when buying crops.</li>
            <li>Respect the terms set by sellers regarding payment, delivery, and product quality.</li>
            <li>
              Agreen Nature Connect is not responsible for coordinating or facilitating delivery arrangements and is not
              liable for any issues arising from the delivery process.
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
          <p>
            Agreen Nature Connect is not liable for any damages or losses resulting from the use of the website or the
            inability to access it. We do not guarantee the accuracy or completeness of the information provided on the
            website.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Modification of Terms</h2>
          <p>
            Agreen Nature Connect reserves the right to modify these terms and conditions at any time without prior
            notice. Users are responsible for regularly reviewing the terms to stay informed of any changes.
          </p>
        </section>
        <section>
          <p>
            By using Agreen Nature Connect, you acknowledge that you have read, understood, and agree to abide by these
            terms and conditions.
          </p>
          {/*
          <p>
            If you have any questions or concerns regarding these terms, please contact us at{" "}
            
            <a className="text-blue-600 underline" href="#">
              natureagreen@gmail.com
            </a>
            .
          </p>
          */}
        </section>
      </div>


      <Footer />
    </div>
  )
}