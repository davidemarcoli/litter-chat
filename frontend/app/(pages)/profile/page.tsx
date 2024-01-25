"use client"

import ProfileForm from '@/components/form/ProfileForm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Divider } from '@nextui-org/react'
import { ArrowLeftFromLine, LogOut } from 'lucide-react'
import PreferencesOverview from '@/components/profile/PreferencesOverview';
import SubscriptionOverview from "@/components/profile/SubscriptionOverview"
import { useAuth } from '@/app/(contexts)/AuthenticationContext'

enum TabType {
  "Preferences",
  "Profile",
  "Subscription"
}

const tabs = [
  "Preferences",
  "Profile",
  "Subscription"  
]

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState(TabType.Preferences)
  const {logout} = useAuth()

  useEffect(() => {
  }, [currentTab])

  const traverseTab = (tabName: string) => {
    switch(tabName) {
      case TabType[TabType.Preferences]:
        setCurrentTab(TabType.Preferences);
        break;
      case TabType[TabType.Profile]:
        setCurrentTab(TabType.Profile);
        break;
      case TabType[TabType.Subscription]:
        setCurrentTab(TabType.Subscription);
        break;
    }
  }

  return (
    <div className="flex items-center justify-center overflow-hidden mx-[10%] my-[2%] border-solid border-4" style={{
      borderImage: 'linear-gradient(to right, #ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff)',
      borderImageSlice: 1, height: "90vh"}}>

        <div className="w-1/3 dark:text-black text-white h-[100%] items-center pl-4 dark:bg-white bg-[#020817]">
            <Link className="my-5 inline-flex flex-row rounded-2xl p-2 bg-white text-black dark:text-white dark:bg-[#020817]" href="/chat">
              <ArrowLeftFromLine/>
              <p className='text-lg ml-4'>Go Back</p>
            </Link>

            <h1 className='text-4xl font-bold'>Settings</h1>

            {tabs.map((item, index) => (
              <ul key={index}>
                <div className='mx-[5%]' onClick={() => traverseTab(item)}>
                  <p className='text-xl my-5 cursor-pointer'>{item}</p>
                  <Divider className="my-5" />
                </div>
              </ul>
            ))}

            <div onClick={() => logout()} className="my-5 inline-flex absolute bottom-[10%] flex-row rounded-2xl p-2 bg-white text-black dark:text-white dark:bg-[#020817] cursor-pointer">
              <LogOut/>
              <p className='text-xl ml-4'>Log out</p>
            </div>
            
        </div>

        <div className="w-2/3 flex flex-col items-center">
          {currentTab === TabType.Preferences && (
            <PreferencesOverview />
          )}

          {currentTab === TabType.Profile && (
            <ProfileForm />
          )}

          {currentTab === TabType.Subscription && (
            <SubscriptionOverview />
          )}
        </div>
    </div>
  )
}

export default ProfilePage