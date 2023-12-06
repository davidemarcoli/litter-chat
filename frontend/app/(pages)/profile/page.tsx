import ProfileForm from '@/components/form/ProfileForm'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import React from 'react'

const ProfilePage = ()=> {
  return (
    <div className="flex h-full mx-[20%] flex-col">
        <Link className="bg-orange-300" href="/chat">Go Back</Link>
        <div>
            <ModeToggle/>
        </div>
        <div className="flex-shrink-0">
            <h1 className="text-lg font-medium">Profile</h1>
            <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
            </p>
        </div>
        <Separator />
        <ProfileForm />
    </div>
  )
}

export default ProfilePage