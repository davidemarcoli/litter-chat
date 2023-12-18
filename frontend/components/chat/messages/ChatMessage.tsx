import React from 'react'

interface ChatMessage {
  message: string
  timestamp: Date
  isUser: boolean
}

const ChatMessage = ({ message, timestamp, isUser }: ChatMessage) => {
  const messageClass = isUser
    ? 'bg-PURPLE text-white self-end rounded-bl-lg rounded-br-lg rounded-tl-lg'
    : 'bg-WHITE text-gray-800 rounded-bl-lg rounded-br-lg rounded-tr-gl';
  
  const containerClass = `max-w-[50%] break-all mb-4 ${
    isUser ? 'self-end float-right pr-2' : 'pl-2'
  }`;

  return (
    <div className={containerClass}>
      <div className={`relative p-4 ${messageClass}`}>
        {!isUser && (
          <div
            className={`absolute top-2 left-[-10px] w-0 h-0 border-10 border-solid border-blue-500 border-t-transparent border-r-transparent border-b-transparent`}
          ></div>
        )}
        <p>{message}</p>
      </div>
      <div className="text-xs text-gray-500 text-right">{timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}</div>
    </div>
  )
}

export default ChatMessage