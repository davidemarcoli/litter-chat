"use client"

import React, { useState } from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import PromoCard from '../promo/PromoCard';

enum ActiveContent {
    CHAT,
    PROMO,
    /* Add more, depending */
}

interface Message {
    content: string 
    timestamp: string 
    isUser: boolean
  }

const ChatArea = () => {
    const [activeCompartment, setActiveCompartment] = useState<ActiveContent|null>(null)
    const [messages, setMessages] = useState<Message[]>([]);

    const testMessages = [
        {message:"Hello there cool guy !", timestamp:"10:32", isUser:true},
        {message:"Hello there cool guy !", timestamp:"10:32", isUser:false},
        {message:"Hello there cool guy !", timestamp:"10:32", isUser:true},
        {message:"Hello there cool guy !", timestamp:"10:32", isUser:true}
    ]

    const handleSendMessage = (newMessage: Message) => {
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
      };
      
  return (
    <div className="flex flex-col h-screen">
        <div className="relative">
            <div className="w-full sticky top-0">
                <Header/>
            </div>
        </div>
        
        {activeCompartment !== ActiveContent.CHAT ? (
            <div className="flex-grow">
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
        ) : (
            <div className="flex-grow">
                <PromoCard/>
            </div>
        )}

        <div className="relative">
            <div className="w-full sticky bottom-0">
                <RoundedTextBox onSendMessage={handleSendMessage}/>
            </div>
        </div>
    </div>
  );
};

export default ChatArea;