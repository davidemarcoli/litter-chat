package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import java.beans.ConstructorProperties
import java.time.LocalDateTime
import java.util.Date

data class ChatMessage @ConstructorProperties("id", "content", "sender", "channel", "createdAt") constructor(
    @Id
    val id: String? = null,
    val content: String,
    @DBRef
    val sender: User,
    @DBRef
    val channel: Channel,
    val createdAt: LocalDateTime = LocalDateTime.now()
)