"use client"

import ProfileForm from '@/components/form/ProfileForm'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Divider } from '@nextui-org/react'
import { ArrowLeftFromLine, LogOut } from 'lucide-react'
import PreferencesOverview from '@/components/profile/PreferencesOverview';
import SubscriptionOverview from "@/components/profile/SubscriptionOverview"

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
    <div className="flex items-center justify-center overflow-hidden mx-[10%] my-[2%] rounded-3xl" style={{height: "90vh"}}>

        <div className="w-1/3 h-[100%] items-center pl-4">
            <Link className="my-5 flex flex-row" href="/chat">
              <ArrowLeftFromLine/>
              <p className='text-lg ml-4'>Go Back</p>
            </Link>

            <h1 className='text-4xl font-bold'>Settings</h1>

            {tabs.map((item, index) => (
              <ul key={index}>
                <div className='bg-orange-400' onClick={() => traverseTab(item)}>
                  <p className='text-xl my-5'>{item}</p>
                  <Divider className="my-5 w-2/3" />
                </div>
              </ul>
            ))}

            <div className='m-4 bg-red-500 absolute bottom-[10%] flex flex-row items-center'>
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