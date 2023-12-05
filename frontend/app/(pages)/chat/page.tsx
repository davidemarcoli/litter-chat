"use server"

import RoundedTextBox from "@/app/components/chat/TextField"
import ChatList from "../../components/chat/ChatList"
import ChatArea from "@/app/components/chat/ChatArea"

const Chat = () => {
    return (
        <>
            {/* Chats side bar*/}
            <div className="flex">
                <div className="w-1/4">
                    <ChatList/>
                </div>
                <div className="w-3/4">
                    <ChatArea/>
                </div>
            </div>
        </>
    )
}

export default Chat