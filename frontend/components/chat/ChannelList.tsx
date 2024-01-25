"use client"

import React, {useEffect, useState} from "react";
import {Badge, Avatar, Button as NextUIButton, Image } from "@nextui-org/react";
import Link from "next/link";
import { ChannelListProps, UserType } from "../types/types";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/app/(contexts)/AuthenticationContext";
import { MessageSquare } from 'lucide-react';

const ChannelList = ({channels, onOpenChannel}: ChannelListProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const auth = useAuth();

    const handleItemClick = (index: number) => {
      setSelectedItem(index);
      // Open chat field
      onOpenChannel(index);
    };

    useEffect(() => {
    }, [selectedItem])

    const getUserForChat = (users: UserType[]) => {
        const notCurrentUsers = users.filter((user) => user.id !== auth.principal?.id);
        if (notCurrentUsers.length === 0) {
            return users[0];
        } else {
            return notCurrentUsers[0];
        }
    }
    
    return (
          <div className="relative dark:bg-[#f8f9fa] dark:text-black bg-[#020817] text-white" style={{height: '100vh'}}>
            <div style={{
              background: 'linear-gradient(to right, #ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff)'
            }}>
              {/* Profile */}
              <div>
                <Link href="/profile">Profile</Link>
              </div>

              {/* Discover button */}
              <div className="m-2">
                <button className="border-2 rounded-2xl p-4">
                  😏 Discover New Matches
                </button>
              </div>
            </div>

            {/* Matches List */}
            <div className="pt-4 flex flex-row items-center p-3 justify-between">
              <h2 className="font-bold">Matches</h2>
              <MessageSquare/>
            </div>
              <ul className="space-y-2 px-2">
                {channels.map((item, index) => (
                  <li key={index} onClick={() => handleItemClick(index)} className={`hover:bg-SELECTED_PURPLE p-4 rounded cursor-pointer
                  ${selectedItem === index ? 'bg-DARK_PURPLE' : ''}`}>
                    <div className="flex flex-row">
                      {/*<div className="flex-none">*/}
                      {/*<Badge content="5" className="bg-orange-400">*/}
                          {/*<Avatar*/}
                          {/*  radius="md"*/}
                          {/*  size="lg"*/}
                          {/*  src={item.url}*/}
                          {/*/>*/}
                          <Image width={50} height={50} src={getUserForChat(item.members).profile?.imageUrl}></Image>
                      {/*</Badge>*/}
                      {/*</div>*/}
                      <div className="flex-col px-4">
                        <p className="font-bold">{getUserForChat(item.members).profile?.name}</p>
                        <p className="text-sm text-gray-400">{getUserForChat(item.members).profile?.bio}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
          </div>
      );
};

export default ChannelList