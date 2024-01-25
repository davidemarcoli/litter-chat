import React from 'react'
import { ModeToggle } from '@/components/theme/mode-toggle'

const PreferencesOverview = () => {
  return (
    <div className="w-full" style={{height: "89.5vh"}}> {/* slighted hard coded height*/}
      
      <div className='m-8'>
        <h1 className="text-2xl font-medium mb-2">Preferences</h1>

        <p className="text-md text-muted-foreground">
          Screen somewhat too bright? Why don&apos;t you toggle on dark mode.
        </p>
        <p className="text-md text-muted-foreground my-2">
          Soothes the eyes am I right 😎!
        </p>
        <div>
          <ModeToggle/>
        </div>
      </div>
    </div>
  )
}

export default PreferencesOverview