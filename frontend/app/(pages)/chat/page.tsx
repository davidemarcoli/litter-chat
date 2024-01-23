"use client"

import ChannelList from "@/components/chat/ChannelList"
import ChatArea from "@/components/chat/ChatArea"
import {useEffect, useState} from "react"
import {io, Socket} from "socket.io-client";
import {ChannelType, ChatMessageType} from "@/components/types/types";
import {Button} from "@/components/ui/button";
import ApiService from "@/app/(services)/ApiService";
import {useAuth} from "@/app/(contexts)/AuthenticationContext";


let socket: Socket | undefined = undefined;

function connect(channelId: string, userId: string) {
    if (socket) {
        socket.disconnect();
    }

    const webSocketUrl = "ws://localhost:8085/chat?channelId=" + channelId + "&userId=" + userId;
    socket = io(webSocketUrl);
    socket.on("connect", () => {
        console.log("Connected to server");
    });
    socket.on("disconnect", () => {
        console.log("Disconnected from server");
    });
    socket.on("reconnect_attempt", () => {
        console.log("Reconnecting to server");
    });
}

const Chat = () => {
    // bin faul gsi... es isch 00:53 uhr
    const [selectedChannelIndex, setSelectedChannelIndex] = useState<number>(-1);
    const [channels, setChannels] = useState<ChannelType[]>([]);

    const auth = useAuth();

    useEffect(() => {
        getChannels();
    }, []);

    const handleOpenChannel = (channelIndex: number) => {
        setSelectedChannelIndex(channelIndex);
        const channel = channels[channelIndex];
        connect(channel.id, auth.principal?.id!);
        socket?.on("chat", (message: any) => {

            console.log("New message", message);
            const newMessage: ChatMessageType = JSON.parse(message);

            console.log("New message", newMessage);
            let channelToUpdate: ChannelType | undefined = channels.find((channel: ChannelType) => channel.id === newMessage.channel.id);
            console.log("Channel", channelToUpdate)

            if (!channelToUpdate) {
                return;
            }

            // TODO: refactor this, it's a mess (WHY DO IS THE CHANNEL TYPE NOT BEING INFERRED CORRECTLY???)

            // channelToUpdate.chatMessages = channelToUpdate.chatMessages || [];
            channelToUpdate.chatMessages = [...channelToUpdate.chatMessages, newMessage];
            // setSelectedChannel(channel);
            console.log("New channel", channelToUpdate)
            const updatedChannels = channels.map((channel: ChannelType) => {
                if (channel.id === newMessage.channel.id) {
                    return channelToUpdate!;
                } else {
                    return channel;
                }
            });
            console.log("Updated channels", updatedChannels)
            // WHY DOESN'T THAT TRIGGER A RE-RENDER? The new message is not being displayed
            setChannels(updatedChannels);
        });
    };

    const handleSendMessage = (newMessage: ChatMessageType) => {
        const copiedNewMessage: ChatMessageType = JSON.parse(JSON.stringify(newMessage));
        copiedNewMessage.channel.chatMessages = [];
        socket!.emit("chat", JSON.stringify(copiedNewMessage));
    }

    const getChannels = () => {
        ApiService.get("/channel").then(r => setChannels(r.data))
    }

    return (
        <div className="flex" style={{height: "100vh"}}>
            {/* Chats side bar*/}
            <div className="w-1/4 bg-PURPLE">
                <ChannelList channels={channels} onOpenChannel={handleOpenChannel}/>
            </div>

            {/* Content Shelf */}
            <div className="w-3/4">
                {selectedChannelIndex != -1 &&
                    <ChatArea currentChannel={channels[selectedChannelIndex]} onSendMessage={handleSendMessage}/>}
            </div>
        </div>
    )
}

export default Chat