import React from 'react'
import { Hourglass, Moon, Flower2  } from 'lucide-react';

const LookingForCard = ({ type }: { type: string}) => {
  return (
    <>
        {type === "Serious" && (
            <div className="w-1/2 p-2 flex flex-row border-2 rounded-full bg-gradient-to-r from-pink-300 to-purple-500">
                <Flower2/>
                <p className='text-lg pl-4'>Serious Relationship</p>
            </div>
        )}

        {type === "Casual" && (
            <div className="w-1/2 p-2 flex flex-row border-2 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500">
                <Moon/>
                <p className='text-lg pl-4'>Casual Dating</p>
            </div>
        )}

        {type === "Unknown" && (
            <div className="w-1/2 p-2 flex flex-row border-2 rounded-full bg-gradient-to-r from-blue-300 to-teal-500">
                <Hourglass/>
                <p className='text-lg pl-4'>Not sure yet</p>
        </div>
        )}
    </>
  )
}

export default LookingForCard