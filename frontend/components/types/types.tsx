/**
 * Component prop structs require the ending "...Props".
 * Basic structs require the ending "Type".
 */

// Component PROPS:
interface ChannelListProps {
    channels: ChannelType[], // bin faul gsi... es isch 00:53 uhr
    onOpenChannel: (index: number) => void;
}

interface ChatAreaProps {
    currentChannel: ChannelType  // TODO(sascha): Added this as a quick fix.
    onSendMessage: (newMessage: ChatMessageType) => void;
    isUserInCurrentChannelOnline: boolean;
}

interface HeaderProps {
    name: string,
    avatarImg: string,
    isOnline: boolean
}

// Basic types:
interface ChatMessageType {
    content: string
    sender: UserType
    channel: ChannelType
    createdAt: Date
}

interface ChannelType {
    id: string
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

export type {ChannelListProps, ChatAreaProps, HeaderProps, ChatMessageType, ChannelType, UserType, ProfileType};