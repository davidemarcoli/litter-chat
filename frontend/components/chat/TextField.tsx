import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";
import EmojiPicker from 'emoji-picker-react';

interface SendButtonProps {
  onSendMessage: (message: Message) => void;
}

interface Message {
  content: string 
  timestamp: string 
  isUser: boolean
}

const RoundedTextBox: React.FC<SendButtonProps> = ({onSendMessage}) => {
  const date = new Date()
  const [messageContent, setMessageContent] = useState<string>("")

  const handleSendClick = () => {
    if (messageContent?.trim() !== "") {
      onSendMessage({content: messageContent, timestamp: `${date.getHours() < 10 ? "0" + date.getHours().toString(): date.getHours().toString()}:${date.getMinutes() < 10 ? "0" + date.getMinutes().toString(): date.getMinutes().toString()}`, isUser:true})
      setMessageContent("")
    }
  }

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageContent(event.target.value)
  }

  return (
    <div className="">
      <input
        type="text"
        value={messageContent}
        onChange={handleMessage}
        className="w-full p-4 rounded-l-full rounded-r-full border border-gray-300 bg-WHITE"
        placeholder="Type something..."
      />

      {/*TODO(sascha): If I have some time might want to implement this*/}
      {/*
      <div className='overflow-y-hidden'>
        <EmojiPicker height="10%" width="40%"/>
      </div>
      */
      }
      <button className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 rounded-r-full bg-PINK" onClick={handleSendClick}>
        {/*TODO(sascha): replace with icon */}
        <Image src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Arrow" className="w-6 h-6 text-white"/>
      </button>
    </div>
  );
};

export default RoundedTextBox;