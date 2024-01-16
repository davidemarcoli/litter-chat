package com.litter.dating.litterchatbackend.controller

import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import com.litter.dating.litterchatbackend.model.entity.ChatMessage
import com.litter.dating.litterchatbackend.model.entity.User
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import java.util.*


class ConnectedSocketInfo(
    val sessionId: UUID,
    val userId: String,
    val channel: String
)

@Component
class ChatModule @Autowired constructor(server: SocketIOServer) {
    private val namespace: SocketIONamespace = server.addNamespace("/chat")

    private val onlineChannelMembers: MutableMap<String, MutableSet<ConnectedSocketInfo>> = mutableMapOf()

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

            val channel = client.handshakeData.getSingleUrlParam("channelId")
            val userId = client.handshakeData.getSingleUrlParam("userId")
            if (onlineChannelMembers.containsKey(channel)) {
                for (member in onlineChannelMembers[channel]!!) {
                    if (member.userId == userId) {
                        namespace.getClient(member.sessionId)?.sendEvent(
                            "chat", data
                        )
                    }
                }
            }

//            namespace.broadcastOperations.sendEvent("chat", data)
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

            val channel = client.handshakeData.getSingleUrlParam("channelId")
            val userId = client.handshakeData.getSingleUrlParam("userId")

            val connectedSocketInfo = ConnectedSocketInfo(
                client.sessionId,
                userId!!,
                channel
            )

            if (onlineChannelMembers.containsKey(channel)) {
                onlineChannelMembers[channel]?.add(connectedSocketInfo)
            } else {
                onlineChannelMembers[channel] = mutableSetOf(connectedSocketInfo)
            }
        }
    }

    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient ->
            log.debug(
                "Client[{}] - Disconnected from chat module.",
                client.sessionId.toString()
            )

            val channel = client.handshakeData.getSingleUrlParam("channelId")
            val userId = client.handshakeData.getSingleUrlParam("userId")
            if (onlineChannelMembers.containsKey(channel)) {
                onlineChannelMembers[channel]?.removeIf { it.sessionId == client.sessionId }
            }
        }
    }

    companion object {
        private val log: Logger = LoggerFactory.getLogger(ChatModule::class.java)
    }
}