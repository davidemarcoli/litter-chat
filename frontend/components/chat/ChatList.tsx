"use client"

import React, {useEffect, useState} from "react";
import {Badge, Avatar, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { ChatListProps, UserType } from "../types/types";

const ChatList = ({matches, onOpenChat}: ChatListProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleItemClick = (chatUser: UserType) => {
      setSelectedItem(chatUser.id);
      // Open chat field
      onOpenChat(chatUser)
    };

    useEffect(() => {
    }, [selectedItem])
    
    return (
        <>
          <div className="bg-PURPLE text-white relative">
           
            {/* Profile */}
            <div>
              <Link href="/profile">Profile</Link>
            </div>

            {/* Discover button */}
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

            {/* Matches List */}
            <div className="pt-4">
              <h2 className="font-bold">Matches</h2>
            </div>
              <ul className="space-y-2 px-2">
                {matches.map((item: UserType, index) => (
                  <li key={index} onClick={() => handleItemClick(item)} className={`hover:bg-SELECTED_PURPLE p-4 rounded cursor-pointer
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
        </>
      );
};

export default ChatList