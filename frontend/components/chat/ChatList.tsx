"use client"

import React, {useEffect, useState} from "react";
import {Badge, Avatar, Button, Image } from "@nextui-org/react";

const test_chats = [
  { id: 1, name: "Francisca", lastMessage: "Hey", url:"https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"},
  { id: 2, name: "Big Tiddy Goth GF", lastMessage: "Let's smash Oliver", url: "https://i.pinimg.com/564x/c8/e4/24/c8e4242420ed4824df5f0666e4b33082.jpg"},
  { id: 3, name: "Jessica", lastMessage: "Die you worthless piece of shi...", url: "https://i.pinimg.com/564x/bf/f3/7d/bff37d05dbcdd395c47754db4faf8be5.jpg"},
  { id: 4, name: "Aubrey", lastMessage: "Let's smash bro", url: "https://i.pinimg.com/564x/df/cf/88/dfcf881305f354981dec87f6bdf310aa.jpg"},
  { id: 5, name: "Samuel", lastMessage: "ughhh ok", url: "https://i.pinimg.com/564x/50/74/bb/5074bb59d88588bff4964d1101861d92.jpg"},
  { id: 6, name: "Jamal", lastMessage: "Hey", url:"https://i.pinimg.com/564x/ff/b9/3d/ffb93d28979429ce561317b54086023f.jpg"},
  { id: 7, name: "Blake", lastMessage: "Die you worthless piece of shi...", url: "https://i.pinimg.com/564x/5c/57/20/5c57208824c8d11fc67269b341ed93bd.jpg"},
  { id: 8, name: "Nadine", lastMessage: "Jinkees", url: "https://noseryoung.ch/wp-content/uploads/2020/09/Nadine_1000x1000px.jpg"},
]

const ChatList = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [chats, setChats] = useState([])

    interface OverflowSilder {
      items: string[];
    }

    const handleItemClick = (id: number) => {
      setSelectedItem(id);
      // Open chat field
      // ...
    };

    useEffect(() => {
    }, [selectedItem])
    
    return (
        <>
          <div className="bg-PURPLE text-white relative h-screen overflow-y-hidden">
            
            <div>
              <Button
              variant="flat"
              color="default"
              radius="lg"
              size="sm">
                <Image></Image>
                Discover New Matches
              </Button>
            </div>
            <div className="pt-4">
              <h2 className="font-bold">Matches</h2>
            </div>
            <div className="">
              <ul className="space-y-2 px-2 overflow-x-hidden overflow-y-scroll">
                {test_chats.map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(item.id)} className={`hover:bg-SELECTED_PURPLE p-4 rounded cursor-pointer
                  ${selectedItem === item.id ? 'bg-DARK_PURPLE' : ''}`}>
                    <div className="flex flex-row">
                      <div className="flex-none">
                      <Badge content="5" className="bg-orange-400">
                          <Avatar
                            radius="md"
                            size="lg"
                            src={item.url}
                          />
                      </Badge>
                      </div>
                      <div className="flex-col px-4">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.lastMessage}</p>
                      </div>
                  </div>
                  </li>
                ))}
              </ul>
              </div>
          </div>
        </>
      );
};

export default ChatList