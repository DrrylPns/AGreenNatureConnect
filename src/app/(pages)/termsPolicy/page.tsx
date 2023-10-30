'use client'
import React, { useState } from 'react'
import Navbar from '@/app/components/Navbar/navbar'
import Image from 'next/image'
import Curve from '../../../../public/images/curve.png'
import Footer from '@/app/components/Footer/footer'
export default function TermsPolicy() {
  const [text, setText] = useState('')
  const showTermsConditions = () =>{
    setText('Terms&Condition')
  }
  const showPrivacyPolicy = () =>{
    setText('PrivacyPolicy')
  }
  return (
    <div>
        <Navbar/>
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
                <p>PRIVACY POLICY</p><br/>
                <p>Data Collection:</p>
                <p>By using our urban farming website, you agree to provide us with certain personal information. This information may include your name, email address, location, and other details relevant to our services.</p>
                <br/>
                <p>Data Use:</p>
                <p>We use the collected personal information to enhance your experience on our website and to provide you with information and updates related to urban farming. Your data may also be used for analytics and research purposes to improve our services.</p>
                <br/>
                <p>Data Protection:</p>
                <p>We take data protection seriously. Your personal information is stored securely, and we implement measures to safeguard it from unauthorized access or disclosure.</p>
                <br/>
                <p>Third-Party Sharing:</p>
                <p>At times, we may share your personal information with trusted third parties, such as payment processors or delivery services, for the purpose of fulfilling our services. Rest assured that we only share the necessary information and require these third parties to maintain strict data protection standards.</p>
                <br/>
                <p>Data Rights:</p>
                <p>You have the right to access, correct, or request the deletion of your personal information held by us. Please contact us for assistance with these requests.</p>
                <br/>
                <p>Consent:</p>
                <p>Your use of our website signifies your consent to the collection and use of your personal information as described in this policy. You can withdraw your consent at any time by contacting us.</p>
                <br/>
                <p>Updates:</p>
                <p>We may update this Privacy and Personal Information clause periodically. It is your responsibility to check for any revisions.</p>
                <br/>
                <br/>
                <p>Please review our complete Privacy Policy for a comprehensive understanding of how we handle your personal information and If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at</p>
                <p>Contact: 09279657750 </p>
                <p>Email: rodel006.re@gmail.com </p>
            </div>
          )}
        </section>
        <Footer/>
    </div>
  )
}
