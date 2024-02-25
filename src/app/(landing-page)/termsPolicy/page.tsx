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
          <h1 className='font-poppins font-bold md:text-[30px] max-sm:text-[5x1]'>Terms & Conditions</h1>
          <h3 className='font-poppins font-medium md:text-[30px] max-sm:text-[5x1]'>We value your privacy</h3>
        </div>
        <div className='absolute md:top-[12.9rem] lg:top-[11.6rem] max-sm:top-[10.1rem] left-0 w-full'>
          <Image
            src={Curve}
            alt=''
          />
        </div>
      </header>
      <section className='flex max-sm:flex-wrap max-sm:px-6 md:px-20 md:gap-20 lg:gap-10 justify-between pb-10 items-start'>
        <div className='flex flex-col md:pr-5  w-[20%] justify-center items-center gap-5 py-10 shrink-0 max-sm:pl-24'>
          <h3 className='text-center font-poppins font-black md:text-[18px] max-sm:text-[10px] max-sm:pl-32 max-sm:mx-32 max-sm:w-96'>Terms and Policies</h3>
          <div className='flex md:flex-col max-sm:flex-row max-sm:pl-32 items-center gap-6 '>
          <button type='button' onClick={showTermsConditions} className='justify-center md:px-5 md:mx-24 md:py-3 md:text-[12px] max-sm:w-36 max-sm:h-10 max-sm:px-7 max-sm:py-1 max-sm:text-[9px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Terms & Conditions</button>
          <button type='button' onClick={showPrivacyPolicy}   className='justify-center md:px-5 md:mx-24 md:py-3 md:text-[12px] max-sm:w-32 max-sm:h-10 max-sm:px-7 max-sm:py-1 max-sm:text-[9px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Privacy Policy</button>
          </div>
        </div>
        {text === 'Terms&Condition' && (
          <div className='text-justify font-serif md:text-[15px] max-sm:text-[10px] md:py-20 max-sm:pb-3'>
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
        )}
        {text === 'PrivacyPolicy' && (
          <div className='text-justify font-serif md:text-[15px] max-sm:text-[10px] md:py-20 max-sm:pb-3'>
            <p className='font-bold'>PRIVACY POLICY</p><br/>
            <p className='font-semibold'>Data Collection:</p>
            <p>By using our urban farming website, you agree to provide us with certain personal information. This information may include your name, email address, location, and other details relevant to our services.</p><br/>
            <p className='font-semibold'>Data Use:</p>
            <p>We use the collected personal information to enhance your experience on our website and to provide you with information and updates related to urban farming. Your data may also be used for analytics and research purposes to improve our services.</p><br/>
            <p className='font-semibold'>Data Protection:</p>
            <p>We take data protection seriously. Your personal information is stored securely, and we implement measures to safeguard it from unauthorized access or disclosure.</p><br/>
            <p className='font-semibold'>Third-Party Sharing:</p>
            <p>At times, we may share your personal information with trusted third parties, such as payment processors or delivery services, for the purpose of fulfilling our services. Rest assured that we only share the necessary information and require these third parties to maintain strict data protection standards.</p><br/>
            <p className='font-semibold'>Data Rights:</p>
            <p>You have the right to access, correct, or request the deletion of your personal information held by us. Please contact us for assistance with these requests.?</p><br/>
            <p className='font-semibold'>Consent:</p>
            <p>Your use of our website signifies your consent to the collection and use of your personal information as described in this policy. You can withdraw your consent at any time by contacting us.</p><br/>
            <p className='font-semibold'>Updates:</p>
            <p>We may update this Privacy and Personal Information clause periodically. It is your responsibility to check for any revisions.</p><br/>
            <p >Please review our complete Privacy Policy for a comprehensive understanding of how we handle your personal information and If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at 📞09279657750 or ✉️rodel006.re@gmail.com</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}