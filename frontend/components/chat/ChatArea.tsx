"use client"

import React, { useState } from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import PromoCard from '../promo/PromoCard';
import {Chip} from "@nextui-org/react";
import { ChatAreaProps, ChatMessageType } from '../types/types';
import {useSession} from "next-auth/react";

const ChatArea = ({currentChat, onSendMessage}: ChatAreaProps) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    const session = useSession()

    const handleSendMessage = (newMessage: ChatMessageType) => {
        console.log(session)

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        onSendMessage(newMessage);
    };
      
  return (
    <div className="flex flex-col h-full bg-gray-400">
       
        {/* Chat header */}
        <div className="w-full sticky top-0">
            <Header name={currentChat.profile.name} avatarImg={currentChat.profile.imageUrl}/>
        </div>
        
        {/* Chat feed */}
        <div className="flex-grow overflow-y-auto pt-4">
            <ul>
                {messages.map((item, index) => (
                <li key={index}>
                    <div className="flex flex-col">
                        {/*TODO: is user*/}
                        <ChatMessage message={item.content} timestamp={item.createdAt} isUser={true}/>
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