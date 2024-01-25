"use client"

import React, {useEffect, useState} from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import PromoCard from '../promo/PromoCard';
import {Chip} from "@nextui-org/react";
import {ChatAreaProps, ChatMessageType, UserType} from '../types/types';
import {useAuth} from "@/app/(contexts)/AuthenticationContext";

const ChatArea = ({currentChannel, onSendMessage, isUserInCurrentChannelOnline}: ChatAreaProps) => {
    const [messages, setMessages] = useState<ChatMessageType[]>(currentChannel.chatMessages);

    const auth = useAuth();

    useEffect(() => {
        setMessages(currentChannel.chatMessages)
    }, [currentChannel.chatMessages]);

    const handleSendMessage = (message: string) => {
        const newMessage: ChatMessageType = {} as ChatMessageType;
        newMessage.content = message;
        newMessage.createdAt = new Date();
        newMessage.sender =  {id: auth.principal!.id} as UserType;
        newMessage.channel = currentChannel;
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        onSendMessage(newMessage);
    };

    const isUser = (user: UserType) => {
        return user.id === auth.principal?.id;
    }

    // TODO: this is a duplicate of the one in ChannelList.tsx
    const getUserForChat = (users: UserType[]) => {
        const user = users.find((user) => user.id !== auth.principal?.id); // TODO: replace with current user
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
            <Header name={getUserForChat(currentChannel.members).profile?.name} avatarImg={getUserForChat(currentChannel.members).profile?.imageUrl} isOnline={isUserInCurrentChannelOnline}/>
        </div>
        
        {/* Chat feed */}
        <div className="flex-grow overflow-y-auto pt-4">
            <ul>
                {messages.map((item, index) => (
                <li key={index}>
                    <div className="flex flex-col">
                        <ChatMessage message={item.content} timestamp={new Date(item.createdAt)} isUser={isUser(item.sender)}/>
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