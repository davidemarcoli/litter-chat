package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef

data class Channel(
    @Id
    val id: String? = null,
    //val name: String,
    @DBRef
    val chatMessages: List<ChatMessage> = emptyList(),
    @DBRef
    val members: List<User>
)