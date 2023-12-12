"use client"

import ChatList from "@/components/chat/ChatList"
import ChatArea from "@/components/chat/ChatArea"
import {useState} from "react"
import {io} from "socket.io-client";

const test_chats = [
    {
        id: 1,
        name: "Francisca",
        lastMessage: "Hey",
        url: "https://i.pinimg.com/564x/e3/0c/56/e30c5626d0b263c6a70edd67c4a1dd8a.jpg"
    },
    {
        id: 2,
        name: "Big Tiddy Goth GF",
        lastMessage: "Let's smash Oliver",
        url: "https://i.pinimg.com/564x/c8/e4/24/c8e4242420ed4824df5f0666e4b33082.jpg"
    },
    {
        id: 3,
        name: "Jessica",
        lastMessage: "Die you worthless piece of shi...",
        url: "https://i.pinimg.com/564x/bf/f3/7d/bff37d05dbcdd395c47754db4faf8be5.jpg"
    },
    {
        id: 4,
        name: "Aubrey",
        lastMessage: "Let's smash bro",
        url: "https://i.pinimg.com/564x/df/cf/88/dfcf881305f354981dec87f6bdf310aa.jpg"
    },
    {
        id: 5,
        name: "Samuel",
        lastMessage: "ughhh ok",
        url: "https://i.pinimg.com/564x/50/74/bb/5074bb59d88588bff4964d1101861d92.jpg"
    },
    {
        id: 6,
        name: "Jamal",
        lastMessage: "Hey",
        url: "https://i.pinimg.com/564x/ff/b9/3d/ffb93d28979429ce561317b54086023f.jpg"
    },
    {
        id: 7,
        name: "Blake",
        lastMessage: "Die you worthless piece of shi...",
        url: "https://i.pinimg.com/564x/5c/57/20/5c57208824c8d11fc67269b341ed93bd.jpg"
    },
    {
        id: 8,
        name: "Nadine",
        lastMessage: "Jinkees",
        url: "https://noseryoung.ch/wp-content/uploads/2020/09/Nadine_1000x1000px.jpg"
    }
]

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
    const [selectedItem, setSelectedItem] = useState({
        id: 999,
        name: "Default",
        lastMessage: "...",
        url: "https://i.pinimg.com/564x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
    });

    const handleOpenChat = (chatUser: any) => {
        setSelectedItem(chatUser);
    };

    return (
<<<<<<< HEAD
        <div className="flex h-screen">
=======
        <div className="flex" style={{height: "100vh"}}>
>>>>>>> main
            {/* Chats side bar*/}
            <div className="w-1/4 bg-PURPLE">
                <ChatList matches={test_chats} onOpenChat={handleOpenChat}/>
            </div>

            {/* Content Shelf */}
            <div className="w-3/4">
                <ChatArea currentChat={selectedItem}/>
            </div>
        </div>
    )
}

export default Chat