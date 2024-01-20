package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id
import java.beans.ConstructorProperties
import java.time.LocalDateTime
import java.util.Date

data class ChatMessage @ConstructorProperties("id", "content", "sender", "channel", "createdAt") constructor(
    @Id
    val id: String? = null,
    val content: String,
    val sender: User,
    val channel: Channel,
    val createdAt: LocalDateTime = LocalDateTime.now()
)