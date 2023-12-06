"use server"

import RoundedTextBox from "@/components/chat/TextField"
import ChatList from "@/components/chat/ChatList"
import ChatArea from "@/components/chat/ChatArea"

const Chat = () => {
    return (
        <div className="flex h-full">
            {/* Chats side bar*/}
            <div className="w-1/4">
                <ChatList/>
            </div>
            
            {/* Content Shelf */}
            <div className="w-3/4">
                <ChatArea/>
            </div>
        </div>
    )
}

export default Chat