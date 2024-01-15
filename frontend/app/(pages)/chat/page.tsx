"use client"

import ChannelList from "@/components/chat/ChannelList"
import ChatArea from "@/components/chat/ChatArea"
import {useEffect, useState} from "react"
import {io} from "socket.io-client";
import {ChannelType, UserType} from "@/components/types/types";
import {Button} from "@/components/ui/button";

// const test_chats: UserType[] = [
//     {
//         id: "1",
//         email: "fra@fdsf.ch",
//         profile: {
//             id: "1",
//             name: "Francisca",
//             bio: "I'm a cool guy",
//             imageUrl: "https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "2",
//         email: "bu.ch",
//         profile: {
//             id: "2",
//             name: "Big Tiddy Goth GF",
//             bio: "Let's smash Oliver",
//             imageUrl: "https://i.pinimg.com/564x/c8/e4/24/c8e4242420ed4824df5f0666e4b33082.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "3",
//         email: "je.ch",
//         profile: {
//             id: "3",
//             name: "Jessica",
//             bio: "Die you worthless piece of shi...",
//             imageUrl: "https://i.pinimg.com/564x/bf/f3/7d/bff37d05dbcdd395c47754db4faf8be5.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "4",
//         email: "au.ch",
//         profile: {
//             id: "4",
//             name: "Aubrey",
//             bio: "Let's smash bro",
//             imageUrl: "https://i.pinimg.com/564x/df/cf/88/dfcf881305f354981dec87f6bdf310aa.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "5",
//         email: "sa.ch",
//         profile: {
//             id: "5",
//             name: "Samuel",
//             bio: "ughhh ok",
//             imageUrl: "https://i.pinimg.com/564x/50/74/bb/5074bb59d88588bff4964d1101861d92.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "6",
//         email: "ja.ch",
//         profile: {
//             id: "6",
//             name: "Jamal",
//             bio: "Hey",
//             imageUrl: "https://i.pinimg.com/564x/ff/b9/3d/ffb93d28979429ce561317b54086023f.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     },
//     {
//         id: "7",
//         email: "bl.ch",
//         profile: {
//             id: "7",
//             name: "Blake",
//             bio: "Die you worthless piece of shi...",
//             imageUrl: "https://i.pinimg.com/564x/5c/57/20/5c57208824c8d11fc67269b341ed93bd.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//
//     },
//     {
//         id: "8",
//         email: "na.ch",
//         profile: {
//             id: "8",
//             name: "Nadine",
//             bio: "Jinkees",
//             imageUrl: "https://noseryoung.ch/wp-content/uploads/2020/09/Nadine_1000x1000px.jpg",
//             createdAt: new Date(),
//             updatedAt: new Date()
//         }
//     }
// ]

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

const Chat = () => {
    // bin faul gsi... es isch 00:53 uhr
    const [selectedChannel, setSelectedChannel] = useState<ChannelType | undefined>(undefined);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getChannels();
    }, []);

    const handleOpenChannel = (channel: ChannelType) => {
        setSelectedChannel(channel);
    };

    const handleSendMessage = (newMessage: any) => {
        socket.emit("chat", newMessage);
    }

    const getChannels = () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/channel", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json()).then(r => setChannels(r));
    }

    const handleCRUDTest = () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/channel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                members: [
                    {
                        id: "656f25dc20794c359caca047",
                    },
                    {
                        id: "656f451cb81bd97b117ba3b4",
                    }
                ]
            })
        }).then(r => r.json()).then(r => console.log(r));
    }

    return (
        <div className="flex" style={{height: "100vh"}}>
            <Button onClick={handleCRUDTest}>Test</Button>
            {/* Chats side bar*/}
            <div className="w-1/4 bg-PURPLE">
                <ChannelList channels={channels} onOpenChannel={handleOpenChannel}/>
            </div>

            {/* Content Shelf */}
            <div className="w-3/4">
                {selectedChannel && <ChatArea currentChannel={selectedChannel} onSendMessage={handleSendMessage}/>}
            </div>
        </div>
    )
}

export default Chat