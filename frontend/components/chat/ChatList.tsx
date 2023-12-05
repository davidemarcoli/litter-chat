"use client"

import React, {useEffect, useState} from "react";
import {Badge, Avatar, Button, Image } from "@nextui-org/react";

const test_chatters = [
  { id: 1, name: "Francisca", lastMessage: "Hey", url:"https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"},
  { id: 2, name: "Jessica", lastMessage: "Die you worthless piece of shi...", url: "https://i.pinimg.com/564x/bf/f3/7d/bff37d05dbcdd395c47754db4faf8be5.jpg"},
  { id: 3, name: "Audrey", lastMessage: "Let's smash bro", url: "https://i.pinimg.com/564x/df/cf/88/dfcf881305f354981dec87f6bdf310aa.jpg"},
  { id: 4, name: "Samuel", lastMessage: "ughhh ok", url: "https://i.pinimg.com/564x/50/74/bb/5074bb59d88588bff4964d1101861d92.jpg"},
]

const ChatList = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [chatrooms, setChatrooms] = useState([])

    const handleItemClick = (id: number) => {
      setSelectedItem(id);
      // Open chat field
      // ...
    };

    useEffect(() => {
    }, [selectedItem])
    

    return (
        <>
          <div className="bg-PURPLE text-white h-screen w-1/4 fixed top-0 left-0">
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
              <ul className="space-y-2 px-4">
                {test_chatters.map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(item.id)} className={`hover:bg-SELECTED_PURPLE p-4 rounded 
                  ${selectedItem === item.id ? 'bg-DARK_PURPLE' : ''}`}>
                  <div className="flex flex-row">
                    <div className="flex-none">
                    <Badge content="5" color="secondary">
                      <Avatar
                        isBordered
                        radius="md"
                        size="lg"
                        src={item.url}
                      />
                    </Badge>
                    </div>
                    <div className="flex-col px-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm">{item.lastMessage}</p>
                    </div>
                  </div>
                  </li>
                ))}
              </ul>
          </div>
        </>
      );
};

export default ChatList