package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id

data class Channel(
    @Id
    val id: String? = null,
    //val name: String,
    val members: List<User>,
    val chatMessages: List<ChatMessage> = emptyList()
)