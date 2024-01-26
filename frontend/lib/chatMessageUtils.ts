import {ChatMessageType, UserType} from "@/components/types/types";
import Principal from "@/components/types/Principal";

export const getUserForChat = (users: UserType[], principal: Principal | undefined) => {
    const user = users.find((user) => user.id !== principal?.id);
    if (!user) {
        return users[0];
    } else {
        return user;
    }
}

export const isLoggedInUser = (user: UserType, principal: Principal | undefined) => {
    return user.id === principal?.id;
}

export const groupMessagesByDate = (messages: ChatMessageType[]) => {
    const groupedMessages = [];
    let currentDate = null;

    for (const message of messages) {
        console.log(message)
        const messageDate = new Date(message.createdAt).toDateString();

        if (currentDate !== messageDate) {
            currentDate = messageDate;
            groupedMessages.push({ date: currentDate, messages: [message] });
        } else {
            groupedMessages[groupedMessages.length - 1].messages.push(message);
        }
    }

    return groupedMessages;
}