import React, { useEffect, useState } from 'react';
import { Image } from "@nextui-org/react";

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
  const [messageContent, setMessageContent] = useState<string|null>(null)

  const handleSendClick = () => {
    if (messageContent?.trim() !== "") {
      
      onSendMessage({content: messageContent!, timestamp: `${date.getHours().toString()}:${date.getMinutes().toString()}`, isUser:true})
      setMessageContent("")
    }
  }

  return (
    <div className="">
      <input
        type="text"
        onChange={(event) => setMessageContent(event.target.value)}
        className="w-full p-4 rounded-l-full rounded-r-full border border-gray-300"
        placeholder="Type something..."
      />
      <button className="absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 rounded-r-full bg-blue-500">
        <Image src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Arrow" className="w-6 h-6 text-white" onClick={handleSendClick}/>
      </button>
    </div>
  );
};

export default RoundedTextBox;