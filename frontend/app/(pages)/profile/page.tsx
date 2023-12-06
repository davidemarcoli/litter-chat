import ProfileForm from '@/components/form/ProfileForm'
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import React from 'react'

const ProfilePage = ()=> {
  return (
    <div className="space-y-6">
        <Link href="/chat">Go Back</Link>
        <div>
            <h3 className="text-lg font-medium">Profile</h3>
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