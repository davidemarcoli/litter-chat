
/**
 * Component prop structs require the ending "...Props".
 * Basic structs require the ending "Type".
 */

// Component PROPS:
interface ChatListProps {
    matches: UserType[], // bin faul gsi... es isch 00:53 uhr
    onOpenChat: (chatUser: any) => void;
}

interface ChatAreaProps {
  currentChat: any  // TODO(sascha): Added this as a quick fix.
}


// Basic types:
interface MessageType {
    content: string 
    timestamp: string 
    isUser: boolean
}

interface UserType {
  id: number // UUID in the future
  name: string
  lastMessage: string
  // avatar img url
  url: string
}



export type { ChatListProps, ChatAreaProps, MessageType, UserType };