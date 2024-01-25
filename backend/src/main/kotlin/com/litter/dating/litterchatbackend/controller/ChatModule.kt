package com.litter.dating.litterchatbackend.controller

import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import com.fasterxml.jackson.databind.ObjectMapper
import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.model.entity.ChatMessage
import com.litter.dating.litterchatbackend.repository.ChannelRepository
import com.litter.dating.litterchatbackend.repository.ChatMessageRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*
import java.util.concurrent.ConcurrentHashMap

@Component
class ChatModule @Autowired constructor(
    server: SocketIOServer,
    private val objectMapper: ObjectMapper,
    private val chatMessageRepository: ChatMessageRepository,
    private val channelRepository: ChannelRepository
) {

    class ConnectedSocketInfo(
        val sessionId: UUID,
        val userId: String,
        val channelId: String
    )

    private val namespace: SocketIONamespace = server.addNamespace("/chat")

    private val onlineChannelMembers: MutableMap<String, MutableSet<ConnectedSocketInfo>> = ConcurrentHashMap()

    init {
        namespace.addConnectListener(onConnected())
        namespace.addDisconnectListener(onDisconnected())
        // TODO: Use a custom class instead of String (NEEDS FIXING OF JSON SERIALIZATION)
        namespace.addEventListener("chat", String::class.java, onChatReceived())
    }

    private fun onChatReceived(): DataListener<String> {
        return DataListener { client: SocketIOClient, data: String, ackSender: AckRequest ->
            log.debug(
                "Client[{}] - Received chat message '{}'",
                client.sessionId.toString(),
                data
            )

            val message = objectMapper.readValue(data, ChatMessage::class.java)
            println(message)


            val savedMessage = chatMessageRepository.save(message)
            println(savedMessage)

//            val channelId = client.handshakeData.getSingleUrlParam("channelId")
            val channel: Channel = channelRepository.findById(message.channel.id!!).get()
            channel.chatMessages.add(savedMessage)
            channelRepository.save(channel)


            val userId = client.handshakeData.getSingleUrlParam("userId")
            if (onlineChannelMembers.filter { it.key == channel.id }.isNotEmpty()) {
                val membersCopy = onlineChannelMembers[channel.id]?.toSet() ?: emptySet()
                for (member in membersCopy) {
                    if (member.userId != userId) {
                        namespace.getClient(member.sessionId)?.sendEvent(
                            "chat", objectMapper.writeValueAsString(savedMessage)
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

            val channelId = client.handshakeData.getSingleUrlParam("channelId")
            val userId = client.handshakeData.getSingleUrlParam("userId")

            val connectedSocketInfo = ConnectedSocketInfo(
                client.sessionId,
                userId!!,
                channelId
            )

            if (onlineChannelMembers.containsKey(channelId)) {
                onlineChannelMembers[channelId]?.add(connectedSocketInfo)
            } else {
                onlineChannelMembers[channelId] = mutableSetOf(connectedSocketInfo)
            }

            for (member in onlineChannelMembers[channelId]!!) {
                if (member.userId != userId) {
                    namespace.getClient(member.sessionId)?.sendEvent(
                        "userOnline", objectMapper.writeValueAsString(true)
                    )
                } else {
                    namespace.getClient(member.sessionId)?.sendEvent(
                        "userOnline", onlineChannelMembers[channelId]?.size!! > 1
                    )
                }
            }
        }
    }

    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient ->
            log.debug(
                "Client[{}] - Disconnected from chat module.",
                client.sessionId.toString()
            )

            val channelId = client.handshakeData.getSingleUrlParam("channelId")
            val userId = client.handshakeData.getSingleUrlParam("userId")
            if (onlineChannelMembers.containsKey(channelId)) {
                onlineChannelMembers[channelId]?.removeIf { it.sessionId == client.sessionId }
                val membersCopy = onlineChannelMembers[channelId]?.toSet() ?: emptySet()
                for (member in membersCopy) {
                    namespace.getClient(member.sessionId)?.sendEvent(
                        "userOnline", objectMapper.writeValueAsString(onlineChannelMembers[channelId]?.size!! > 1)
                    )
                }
            }
        }
    }

//    private fun getIpByClient(client: SocketIOClient): String {
//        val sa = client.remoteAddress.toString()
//        return sa.substring(1, sa.indexOf(":"))
//    }

    companion object {
        private val log: Logger = LoggerFactory.getLogger(ChatModule::class.java)
    }
}