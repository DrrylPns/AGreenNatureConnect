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
      <header className='relative px-20 md:pt-32 max-sm:pt-14 max-sm:pl-5 pb-16 flex justify-start bg-gradient-to-r from-[#2D5F4D] to-[#2D5F4D80] border-b-[7px] border-black'>
        <div className='text-center max-sm:mt-9'>
          <h1 className='font-poppins font-bold md:text-[30px] max-sm:text-[5x1]'>AGreen Nature Connect</h1>
          <h1 className='font-poppins font-bold md:text-[30px] max-sm:text-[5x1]'>Terms & Conditions</h1>
          <h3 className='font-poppins font-medium md:text-[30px] max-sm:text-[5x1]'>We value your privacy</h3>
        </div>
        <div className='absolute md:top-[13.5rem] max-sm:top-[9.1rem] left-0 w-full'>
          <Image
            src={Curve}
            alt=''
          />
        </div>
      </header>
      <section className='flex max-sm:flex-wrap px-20 gap-10 justify-between items-start'>
        <div className='flex md:flex-col w-[40%] justify-center max-sm:grow-34 items-center gap-5 mt-20'>
          <h3 className='text-center font-poppins font-black md:text-[18px] max-sm:text-[10px] max-sm:break'>Terms and Policies</h3>
          <button type='button' onClick={showTermsConditions} className='px-5 py-3 md:text-[12px] text-[5px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Terms & Conditions</button>
          <button type='button' onClick={showPrivacyPolicy} className='px-5 py-3 md:text-[12px] text-[5px] font-poppins font-bold rounded-lg bg-amber w-4/5 hover:bg-orange-200 transition-colors ease-linear duration-500 shadow-sm drop-shadow-sm'>Privacy Policy</button>
        </div>
        {text === 'Terms&Condition' && (
          <div className='max-sm:pt-10 text-justify text-[15px] py-20'>
            <p>TERMS & CONDITIONS</p><br/>
            <p>Acceptance of Terms and Conditions:</p>
            <p>By using AGreen Nature Connect, you agree to these Terms and Conditions. If you don't agree, please refrain from using the Platform.</p><br/>
            <p> Changes to Terms:</p>
            <p>We may update these Terms without notice. Please review them periodically.</p><br/>
            <p>Use of Platform:</p>
            <p> You're responsible for your account and activities.</p>
            <p>Do not violate laws, use the Platform for illegal purposes, transmit - malware, or access unauthorized areas.</p><br/>
            <p>MarketHub and Urban Farming:</p>
            <p>The MarketHub facilitates user interactions related to urban farming.</p>
            <p>Users in the MarketHub must follow relevant laws.</p>
            <p>AGreen Nature Connect is not responsible for user transactions.</p><br/>
            <p>User-Generated Content:</p>
            <p>Users can post content on the Platform.</p>
            <p>Do not post any offensive or illegal content.</p>
            <p>You grant AGreen Nature Connect a license to use submitted content.</p><br/>
            <p>Privacy Policy:</p>
            <p>Your data is governed by our Privacy Policy, available on the Platform.</p><br/>
            <p>Intellectual Property:</p>
            <p>All content on the Platform belongs to AGreen Nature Connect and is protected by Copyright.</p><br/>
            <p>Termination:</p>
            <p> AGreen Nature Connect reserves the right to terminate or suspend your access to the Platform at its discretion, without notice.</p><br/>
            <p>Disclaimer:</p>
            <p>AGreen Nature Connect makes no warranties or representations about the accuracy or completeness of the information on the Platform and is not responsible for any errors or omissions.</p><br/>
            <p>Limitation of Liability:</p>
            <p>We are not liable for damages resulting from your use of the Platform.</p><br/>
            <p>Governing Law:</p>
            <p>These Terms are governed by the laws of Brgy. Bagbag, Philippines.</p><br/>
            <p>Entire Agreement:</p>
            <p>These Terms and Conditions represent the entire agreement between you and AGreen Nature Connect regarding the Platform.</p><br/>
            <p>Contact Information:</p>
            <p>For questions, contact us at 📞09279657750 or at  ✉️rodel006.re@gmail.com.</p><br/>
          </div>
        )}
        {text === 'PrivacyPolicy' && (
          <div className='text-justify text-[15px] py-20'>
            <p>PRIVACY POLICY</p><br/>
            <p>Data Collection:</p>
            <p>By using our urban farming website, you agree to provide us with certain personal information. This information may include your name, email address, location, and other details relevant to our services.</p><br/>
            <p>Data Use:</p>
            <p>We use the collected personal information to enhance your experience on our website and to provide you with information and updates related to urban farming. Your data may also be used for analytics and research purposes to improve our services.</p><br/>
            <p>Data Protection:</p>
            <p>We take data protection seriously. Your personal information is stored securely, and we implement measures to safeguard it from unauthorized access or disclosure.</p><br/>
            <p>Third-Party Sharing:</p>
            <p>At times, we may share your personal information with trusted third parties, such as payment processors or delivery services, for the purpose of fulfilling our services. Rest assured that we only share the necessary information and require these third parties to maintain strict data protection standards.</p><br/>
            <p>Data Rights:</p>
            <p>You have the right to access, correct, or request the deletion of your personal information held by us. Please contact us for assistance with these requests.?</p><br/>
            <p>Consent:</p>
            <p>Your use of our website signifies your consent to the collection and use of your personal information as described in this policy. You can withdraw your consent at any time by contacting us.</p><br/>
            <p>Updates:</p>
            <p>We may update this Privacy and Personal Information clause periodically. It is your responsibility to check for any revisions.</p><br/>
            <p>Please review our complete Privacy Policy for a comprehensive understanding of how we handle your personal information and If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at 📞09279657750 or ✉️rodel006.re@gmail.com</p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}