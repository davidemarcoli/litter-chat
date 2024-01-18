import ProfileForm from '@/components/form/ProfileForm'
import { ModeToggle } from '@/components/theme/mode-toggle'
import Link from 'next/link'
import React from 'react'
import { Divider } from '@nextui-org/react'
import { ArrowLeftFromLine, LogOut } from 'lucide-react'

const ProfilePage = ()=> {

  // simple use state with tabs -> on click change current tab.
  const tabs = [
    "Preferences",
    "Profile",
    "Subscription"
  ]

  return (
    <div className="flex items-center justify-center overflow-hidden mx-[10%] my-[2%] rounded-3xl" style={{height: "90vh"}}>

        <div className="w-1/3 h-[100%] items-center pl-4 bg-orange-200">

            <Link className="my-5 flex flex-row" href="/chat">
              <ArrowLeftFromLine/>
              <p className='text-lg ml-4'>Go Back</p>
            </Link>

            <h1 className='text-4xl font-bold'>Settings</h1>


            {tabs.map((item, index) => (
              <ul key={index}>
                <div className=''>
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
          <div>
              <ModeToggle/>
          </div>
          <div className="">
              <h1 className="text-lg font-medium">Profile</h1>
              <p className="text-sm text-muted-foreground">
                  This is how others will see you on the site.
              </p>
          </div>
          <ProfileForm />
        </div>
    </div>
  )
}

export default ProfilePage