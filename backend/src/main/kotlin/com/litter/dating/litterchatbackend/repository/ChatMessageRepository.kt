package com.litter.dating.litterchatbackend.repository

import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.model.entity.ChatMessage
import com.litter.dating.litterchatbackend.model.entity.User
import org.springframework.data.mongodb.repository.MongoRepository

interface ChatMessageRepository : MongoRepository<ChatMessage, String> {
}