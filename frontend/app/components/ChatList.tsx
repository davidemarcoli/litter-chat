"use client"

import React, {useEffect, useState} from "react";
import Avatar from "./Avatar";

const test_chatters = [
  { id: 1, name: "Francisca", lastMessage: "Hey" },
  { id: 2, name: "Jessica", lastMessage: "Die you worthless piece of shi..." },
  { id: 3, name: "Audrey", lastMessage: "Let's smash bro" },
  { id: 4, name: "Samuel", lastMessage: "ughhh ok" },
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
            <div className="p-4">
              <h2 className="text-2xl font-bold">Sidebar</h2>
            </div>
            <nav>
              <ul className="space-y-2 p-4">
                {test_chatters.map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(item.id)} className={`hover:bg-SELECTED_PURPLE p-4 rounded 
                  ${selectedItem === item.id ? 'bg-DARK_PURPLE' : ''}`}>
                  <div className="flex flex-row">
                    <div className="flex-none">
                      <Avatar src={"https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"} alt={`${item.id} Avatar`}/>  
                    </div>
                    <div className="flex-col px-4">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm">{item.lastMessage}</p>
                    </div>
                  </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      );
};

export default ChatList