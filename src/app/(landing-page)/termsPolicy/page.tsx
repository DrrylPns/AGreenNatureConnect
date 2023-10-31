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
    <div>
      <header className='relative px-20 pt-32 pb-20 flex justify-start bg-gradient-to-r from-[#2D5F4D] to-[#2D5F4D80] border-b-[7px] border-black'>
        <div className='text-center'>
          <h1 className='font-poppins font-bold text-5xl'>AGreen Nature Connect</h1>
          <h1 className='font-poppins font-bold text-5xl'>Terms & Conditions</h1>
          <h3 className='font-poppins font-medium text-3xl'>We value your privacy</h3>
        </div>
        <div className='absolute top-[13.5rem] left-0 w-full'>
          <Image
            src={Curve}
            alt=''
          />
        </div>
      </header>
      <section className='flex px-20 gap-10 justify-between items-start'>
        <div className='flex flex-col w-[40%] justify-center items-center gap-5 mt-20'>
          <h3 className='font-poppins font-black text-[18px]'>Terms and Policies</h3>
          <button type='button' onClick={showTermsConditions} className='px-5 py-3 text-[12px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Terms & Conditions</button>
          <button type='button' onClick={showPrivacyPolicy} className='px-5 py-3 text-[12px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Privacy Policy</button>
        </div>
        {text === 'Terms&Condition' && (
          <div className='text-justify py-20'>
            <p>TERMS & CONDITIONS</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
          </div>
        )}
        {text === 'PrivacyPolicy' && (
          <div className='text-justify py-20'>
            <p>PRIVACY POLICY</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet ea dolorum architecto? Ratione soluta assumenda doloribus ipsum blanditiis rem consequatur consequuntur? Nisi id doloremque, voluptas dolorum iusto sit sequi quam?</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}
