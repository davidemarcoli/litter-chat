"use client"

import React, {useEffect, useState} from "react";
import {Badge, Avatar, Button as NextUIButton, Image } from "@nextui-org/react";
import Link from "next/link";
import { ChannelListProps, UserType } from "../types/types";
import {Button} from "@/components/ui/button";

const ChannelList = ({channels, onOpenChannel}: ChannelListProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
      setSelectedItem(index);
      // Open chat field
      onOpenChannel(channels[index]);
    };

    useEffect(() => {
    }, [selectedItem])

    const getUserForChat = (users: UserType[]) => {
        const user = users.find((user) => user.id !== "1"); // TODO: replace with current user
        if (!user) {
            return users[0];
        } else {
            return user;
        }
    }
    
    return (
          <div className="bg-PURPLE text-white relative">
           
            {/* Profile */}
            <div>
              <Link href="/profile">Profile</Link>
            </div>

            {/* Discover button */}
            <div>
              <NextUIButton
              variant="flat"
              color="default"
              radius="lg"
              size="sm">
                <Image></Image>
                Discover New Matches
              </NextUIButton>
                <Button>
                    <Image></Image>
                    Discover New Matches
                </Button>
            </div>

            {/* Matches List */}
            <div className="pt-4">
              <h2 className="font-bold">Matches</h2>
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