package com.litter.dating.litterchatbackend.model.entity

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import java.beans.ConstructorProperties

data class Channel @ConstructorProperties("id", "chatMessages", "members") constructor(
    @Id
    val id: String? = null,
    //val name: String,
    @DBRef
    @JsonIgnoreProperties("channel")
    val chatMessages: ArrayList<ChatMessage> = ArrayList(),
    @DBRef
    val members: ArrayList<User>
)