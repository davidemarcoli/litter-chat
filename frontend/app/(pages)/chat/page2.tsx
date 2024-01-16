import Chat from "@/app/(pages)/chat/actual-component";

const ChatPage = async () => {

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL + "/channel")
    const channels = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/channel", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => r.json());

    console.log(channels)

    return (
        <Chat channels={channels} />
    )
}

export default ChatPage