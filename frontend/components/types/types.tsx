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
    currentChat: UserType  // TODO(sascha): Added this as a quick fix.
    onSendMessage: (newMessage: ChatMessageType) => void;
}


// Basic types:
interface ChatMessageType {
    content: string
    sender: UserType
    channel: ChannelType
    createdAt: Date
}

interface ChannelType {
    id: number
    members: UserType[]
    chatMessages: ChatMessageType[]
}

interface UserType {
    id: string
    email: string
    profile: ProfileType
}

interface ProfileType {
    id: string,
    name: string,
    bio: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date
}

export type {ChatListProps, ChatAreaProps, ChatMessageType, ChannelType, UserType, ProfileType};