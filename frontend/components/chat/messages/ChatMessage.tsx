import React from 'react'

interface ChatMessageProps {
    message: string
    timestamp: Date
    isUser: boolean
}

const ChatMessage = ({message, timestamp, isUser}: ChatMessageProps) => {
    const containerClass = `max-w-[50%] break-all mb-4 px-2 mx-2 flex ${
        isUser ? 'self-end float-right bg-PURPLE text-white self-end rounded-bl-lg rounded-br-lg rounded-tl-lg' : 'self-start bg-WHITE text-gray-800 rounded-bl-lg rounded-br-lg rounded-tr-gl'
    }`;

    return (
        <div className={containerClass}>
            <div className={`relative p-4`}>
                {!isUser && (
                    <div
                        className={`absolute top-2 left-[-10px] w-0 h-0 border-10 border-solid border-blue-500 border-t-transparent border-r-transparent border-b-transparent`}
                    ></div>
                )}
                <p>{message}</p>
            </div>
            {/*<div*/}
            {/*    className="text-xs text-gray-500 text-right">{timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}</div>*/}
            <div className="flex flex-row justify-end items-end">
                <div className="text-xs text-gray-500 m-1">
                    {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
        </div>
</div>
)
}

export default ChatMessage