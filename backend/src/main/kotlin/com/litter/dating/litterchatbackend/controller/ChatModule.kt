package com.litter.dating.litterchatbackend.controller

import com.corundumstudio.socketio.*
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import com.litter.dating.litterchatbackend.model.ChatMessage
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


@Component
class ChatModule @Autowired constructor(server: SocketIOServer) {
    private val namespace: SocketIONamespace = server.addNamespace("/chat")

    init {
        namespace.addConnectListener(onConnected())
        namespace.addDisconnectListener(onDisconnected())
        namespace.addEventListener("chat", ChatMessage::class.java, onChatReceived())
    }

    private fun onChatReceived(): DataListener<ChatMessage> {
        return DataListener { client: SocketIOClient, data: ChatMessage?, ackSender: AckRequest? ->
            log.debug(
                "Client[{}] - Received chat message '{}'",
                client.sessionId.toString(),
                data
            )
            namespace.broadcastOperations.sendEvent("chat", data)
        }
    }

    private fun onConnected(): ConnectListener {
        return ConnectListener { client: SocketIOClient ->
            val handshakeData = client.handshakeData
            log.debug(
                "Client[{}] - Connected to chat module through '{}'",
                client.sessionId.toString(),
                handshakeData.url
            )
        }
    }

    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient ->
            log.debug(
                "Client[{}] - Disconnected from chat module.",
                client.sessionId.toString()
            )
        }
    }

    companion object {
        private val log: Logger = LoggerFactory.getLogger(ChatModule::class.java)
    }
}