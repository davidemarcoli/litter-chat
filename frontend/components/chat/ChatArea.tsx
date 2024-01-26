"use client"

import React, {useEffect, useState} from 'react';
import RoundedTextBox from './TextField';
import Header from './Header';
import ChatMessage from './messages/ChatMessage';
import {ChatAreaProps, ChatMessageType, UserType} from '../types/types';
import {useAuth} from "@/app/(contexts)/AuthenticationContext";
import {getUserForChat, groupMessagesByDate, isLoggedInUser} from "@/lib/chatMessageUtils";

const ChatArea = ({currentChannel, onSendMessage, isUserInCurrentChannelOnline}: ChatAreaProps) => {
    const [messages, setMessages] = useState<ChatMessageType[]>(currentChannel.chatMessages);
    const chatWindowRef = React.useRef<HTMLDivElement>(null);

    const auth = useAuth();

    useEffect(() => {
        setMessages(currentChannel.chatMessages)
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [currentChannel.chatMessages]);

    const handleSendMessage = (message: string) => {
        const newMessage: ChatMessageType = {} as ChatMessageType;
        newMessage.content = message;
        newMessage.createdAt = new Date();
        newMessage.sender = {id: auth.principal!.id} as UserType;
        newMessage.channel = currentChannel;
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        onSendMessage(newMessage);
    };

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className="flex flex-col h-full bg-gray-400">

            {/* Chat header */}
            <div className="w-full sticky top-0">
                <Header name={getUserForChat(currentChannel.members, auth.principal).profile?.name}
                        avatarImg={getUserForChat(currentChannel.members, auth.principal).profile?.imageUrl}
                        isOnline={isUserInCurrentChannelOnline}/>
            </div>

            {/* Chat feed */}
            <div className="flex-grow overflow-y-auto pt-4" ref={chatWindowRef}>
                <ul>
                    {groupedMessages.map((group, groupIndex) => (
                        <li key={groupIndex}>
                            <div className="text-center mt-8 mb-2 italic">{group.date}</div>
                            {group.messages.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <ChatMessage message={item.content} timestamp={new Date(item.createdAt)}
                                                 isUser={isLoggedInUser(item.sender, auth.principal)}/>
                                </div>
                            ))}
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