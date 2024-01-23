import React from 'react'
import { ModeToggle } from '@/components/theme/mode-toggle'

const PreferencesOverview = () => {
  return (
    <div className="">
      <h1 className="text-lg font-medium">Profile</h1>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>
      <div>
        <ModeToggle/>
      </div>
    </div>
  )
}

export default PreferencesOverview