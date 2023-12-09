package com.litter.dating.litterchatbackend.model

class ChatMessage {
    private var userName: String? = null
    private var message: String? = null

    constructor()

    constructor(userName: String?, message: String?) : super() {
        this.userName = userName
        this.message = message
    }

    override fun toString(): String {
        return "ChatMessage{" +
                "userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                '}'
    }
}