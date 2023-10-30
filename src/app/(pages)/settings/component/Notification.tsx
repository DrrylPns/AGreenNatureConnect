'use client'
import React,{useState} from 'react'
import { PiCaretDown } from 'react-icons/pi'
import {Switch} from '@headlessui/react'

export default function Notification() {
    const [enabledMentions, setEnabledMentions] = useState(false)
    const [enabledComments, setEnabledComments] = useState(false)
    const [enabledReplies, setEnabledReplies] = useState(false)
    const [enabledNewFollower, setEnabledNewFollower] = useState(false)
    const [enabledPostYouFollow, setEnabledPostYouFollow] = useState(false)
    const [enabledRecommendation, setEnabledRecommendation] = useState(false)
  return (
    <div className='mt-5 font-poppins'>
        <h1 className='font-bold pl-10 my-5'>Notification Setting</h1>
        <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Activity</h2>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>Mentions of u/username</h3>
            </div>
            <Switch
                checked={enabledMentions}
                onChange={setEnabledMentions}
                className={`${enabledMentions ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledMentions ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>Comments on your posts</h3>
            </div>
            <Switch
                checked={enabledComments}
                onChange={setEnabledComments}
                className={`${enabledComments ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledComments ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>Replies to your comments</h3>
            </div>
            <Switch
                checked={enabledReplies}
                onChange={setEnabledReplies}
                className={`${enabledReplies ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledReplies ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>New Followers</h3>
            </div>
            <Switch
                checked={enabledNewFollower}
                onChange={setEnabledNewFollower}
                className={`${enabledNewFollower ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledNewFollower ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>Post you follow</h3>
            </div>
            <Switch
                checked={enabledPostYouFollow}
                onChange={setEnabledPostYouFollow}
                className={`${enabledPostYouFollow ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledPostYouFollow ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
        
        <h2 className='pl-5 border-b border-gray-400 text-gray-400 uppercase text-[0.8rem]'>Recommendation</h2>
        <div className='flex items-center justify-between font-bold text-[0.8rem] pl-5 my-5'>
            <div>
                <h3>Community Recommendations</h3>
            </div>
            <Switch
                checked={enabledRecommendation}
                onChange={setEnabledRecommendation}
                className={`${enabledRecommendation ? 'bg-green' : 'bg-gray-600'}
                relative inline-flex h-[32px] w-[64px] mr-5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={`${enabledRecommendation ? 'translate-x-8' : 'translate-x-0'}
                    pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    </div>
  )
}
