import { Button } from '@nextui-org/react'
import React from 'react'
import { X } from 'lucide-react';
import { Heart } from 'lucide-react';
import './ExpansionAnimation.css';

const LitterCardsActionButton = () => {
    const like = () => {
        console.log("Like")
    }

    const dislike = () => {
        console.log("Dislike")
    }

  return (
    <div className='flex flex-row items-center fixed bottom-0 right-[30%] z-99'> {/* Quick fix with spacing */}
       <div className="px-4 justify-between">
            <button onClick={dislike} className='hover:bg-slate-200 dark:hover:bg-[#051338] shake rounded-full shadow-lg m-4 p-8 border-4 border-red-500 text-red-500' aria-label="Dislike">
                <X/>
            </button>
            <button onClick={like} className='hover:bg-slate-200 dark:hover:bg-[#051338] shake rounded-full shadow-lg m-4 p-8 border-4 border-green-500 text-green-500' aria-label="Like">
                <Heart/>
            </button>
       </div>
    </div>
  )
}

export default LitterCardsActionButton