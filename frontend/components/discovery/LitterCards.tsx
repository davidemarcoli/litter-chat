import { Button, Divider, Image } from '@nextui-org/react'
import {Chip} from "@nextui-org/react";
import LitterCardsActionButton from './LitterCardsActionButton';
import { Info, MoveDown, GraduationCap, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import './ExpansionAnimation.css';
import { LookingFor, ProfileType } from '../types/types';
import LookingForCard from './LookingForCard';

const LitterCards = () => {

    // User should be passed down into this component
  const possibleMatches: ProfileType =
    {
        id: "2",
        name: "Big Tiddy Goth GF",
        bio: "Let's smash Oliver",
        imageUrl: "https://i.pinimg.com/564x/ff/b9/3d/ffb93d28979429ce561317b54086023f.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    }

  const testNextMatch: ProfileType =
    {
        id: "5",
        name: "Jermey",
        bio: "Let's smash Oliver",
        imageUrl: "https://i.pinimg.com/564x/ff/b9/3d/ffb93d28979429ce561317b54086023f.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
    }

  const [isExpanded, setIsExpanded] = useState(false);

  const expandProfile = () => {
    setIsExpanded(!isExpanded);
  };

  const activities = [
    "Pokemon",
    "Traveling",
    "Outdoors",
    "Gaming",
    "Gym",
    "Pokemon",
    "Traveling",
    "Outdoors",
    "Gaming",
    "Gym",
    "Pokemon",
    "Traveling",
    "Outdoors",
    "Gaming",
    "Gym",
    "Pokemon",
    "Traveling",
    "Outdoors",
    "Gaming",
    "Gym",
  ]

  return (
    <div className="flex items-center justify-center">
        <div className='relative flex flex-col max-h-screen overflow-y-auto flex-container'>
            <Image 
                className='relative bottom-0 h-[80vh] m-4 z-1'
                src={possibleMatches.imageUrl}
                alt='Profile Picture'>
            </Image>

            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent"></div>
            
            <Button onClick={expandProfile} radius='full' size="lg" className={`absolute bottom-[4%] right-[10%] shadow-lg mb-5`} isIconOnly aria-label="Info" variant="faded">
                <Info/>
            </Button>

            {isExpanded && (
            <Button onClick={expandProfile} radius='full' size="sm" className='absolute bottom-[-2.5%] right-[50%] shadow-lg mb-5' isIconOnly aria-label="Info">
                <MoveDown/>
            </Button>
            )}
            
            <div className='items-start'>
                <div className='absolute bottom-[5%] left-[5%] z-5'>
                    <p className='text-2xl font-bold'>{possibleMatches.name}, <i>27</i></p>
                    <p className='mt-1 text-xl font-semibold'>He / Him</p>
                </div>
                
                {isExpanded && (
                    <div className="absolute top-[99%] expandable-div expanded z-9 px-[3%]">
                        <div className="expansion-content">
                            <div className="my-2 flex flex-row">
                                <GraduationCap/> 
                                <p className='pl-4 text-base'>
                                    Pro League Player
                                </p>
                            </div>
                            <div className="my-2 flex flex-row">
                                <UserRound/> 
                                <p className='pl-4 text-base'>
                                    Straight Male
                                </p>
                            </div>
                            
                            <Divider className="my-4" />

                            <LookingForCard type={"Casual"}/>

                            <Divider className="my-4" />
                            
                            <div>
                                <p className='text-lg font-semibold'>Bio</p>
                                <p className='mt-2 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus at cupiditate nemo, vitae ipsa laboriosam quas illo in veritatis ex!</p>
                            </div>
                            
                            <Divider className="my-4" />

                            <div className="my-2 flex flex-wrap">
                                {activities.map((item, index) => (
                                    <ul key={index}>
                                        <div className='border-2 rounded-full border-slate-300 text-sm font-normal px-2 py-1 mx-1 my-1 inline-block'>{item}</div>
                                    </ul>
                                ))}
                            </div>

                        </div>
                    </div>
                    )}


            </div>
            <LitterCardsActionButton/>
        </div>

    </div>
  )
}

export default LitterCards