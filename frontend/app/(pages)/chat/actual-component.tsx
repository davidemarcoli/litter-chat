"use client"

import ChannelList from "@/components/chat/ChannelList"
import ChatArea from "@/components/chat/ChatArea"
import {useEffect, useState} from "react"
import {io} from "socket.io-client";
import {ChannelType, UserType} from "@/components/types/types";
import {Button} from "@/components/ui/button";

const webSocketUrl = "ws://localhost:8085/chat?token=123";
const socket = io(webSocketUrl);
socket.on("connect", () => {
    console.log("Connected to server");
});
socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
socket.on("chat", (message: any) => {
    console.log("New message", message);
});
socket.on("reconnect_attempt", () => {
    console.log("Reconnecting to server");
});

const Chat = ({channels = []}: {channels: ChannelType[]}) => {
    // bin faul gsi... es isch 00:53 uhr
    const [selectedChannel, setSelectedChannel] = useState<ChannelType | undefined>(undefined);

    const handleOpenChannel = (channel: ChannelType) => {
        setSelectedChannel(channel);
    };

    const handleSendMessage = (newMessage: any) => {
        socket.emit("chat", newMessage);
    }

    return (
        <div className="flex" style={{height: "100vh"}}>
            {/* Chats side bar*/}
            <div className="w-1/4 bg-PURPLE">
                {/*<ChannelList channels={channels} onOpenChannel={handleOpenChannel}/>< <-- Davide ich tätsch dich für das*/> }
            </div>

            {/* Content Shelf */}
            <div className="w-3/4">
                {/*selectedChannel && <ChatArea currentChannel={selectedChannel} onSendMessage={handleSendMessage}/>  <-- Davide ich tätsch dich für das*/}
            </div>
        </div>
    )
}

export default Chat