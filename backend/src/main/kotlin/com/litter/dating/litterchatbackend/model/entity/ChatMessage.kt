package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id

data class ChatMessage(
    @Id
    val id: String? = null,
    val content: String,
    val sender: User,
    val channel: Channel,
    val createdAt: Long = System.currentTimeMillis()
)