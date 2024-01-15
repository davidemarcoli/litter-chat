"use client"

import React, { useState } from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import PromoCard from '../promo/PromoCard';
import {Chip} from "@nextui-org/react";
import {ChatAreaProps, ChatMessageType, UserType} from '../types/types';

const ChatArea = ({currentChannel, onSendMessage}: ChatAreaProps) => {
    const [messages, setMessages] = useState<ChatMessageType[]>(currentChannel.chatMessages);


    const handleSendMessage = (newMessage: ChatMessageType) => {

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        onSendMessage(newMessage);
    };

    const isUser = (user: UserType) => {
        return user.id === "1"; // TODO: replace with current user
    }

    // TODO: this is a duplicate of the one in ChannelList.tsx
    const getUserForChat = (users: UserType[]) => {
        console.log(users)
        console.log(currentChannel)
        const user = users.find((user) => user.id !== "1"); // TODO: replace with current user
        if (!user) {
            return users[0];
        } else {
            return user;
        }
    }
      
  return (
    <div className="flex flex-col h-full bg-gray-400">
       
        {/* Chat header */}
        <div className="w-full sticky top-0">
            <Header name={getUserForChat(currentChannel.members).profile?.name} avatarImg={getUserForChat(currentChannel.members).profile?.imageUrl}/>
        </div>
        
        {/* Chat feed */}
        <div className="flex-grow overflow-y-auto pt-4">
            <ul>
                {messages.map((item, index) => (
                <li key={index}>
                    <div className="flex flex-col">
                        <ChatMessage message={item.content} timestamp={item.createdAt} isUser={isUser(item.sender)}/>
                    </div>
                </li>
            ))}
            </ul>
        </div>

        {/* Text box */}
        <div className="w-full sticky bottom-0">
            <RoundedTextBox onSendMessage={handleSendMessage}/>
        </div>
    </div>
  );
};

export default ChatArea;