"use client"

import React, { useState } from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import PromoCard from '../promo/PromoCard';
import {Chip} from "@nextui-org/react";
import { ChatAreaProps, MessageType } from '../types/types';

const ChatArea = ({currentChat}: ChatAreaProps) => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const handleSendMessage = (newMessage: MessageType) => {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
    };
      
  return (
    <div className="flex flex-col h-full bg-gray-400">
       
        {/* Chat header */}
        <div className="w-full sticky top-0">
            <Header name={currentChat.name} avatarImg={currentChat.url}/>
        </div>
        
        {/* Chat feed */}
        <div className="flex-grow overflow-y-scroll pt-4">
            <ul>
                {messages.map((item, index) => (
                <li key={index}>
                    <div className="flex flex-col">
                        <ChatMessage message={item.content} timestamp={item.timestamp} isUser={item.isUser}/>
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