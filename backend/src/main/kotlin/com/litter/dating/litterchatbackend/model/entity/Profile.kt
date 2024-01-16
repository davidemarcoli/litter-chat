package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id
import java.time.LocalDateTime

data class Profile(
    @Id
    val id: String? = null,
    var name: String? = null,
    val bio: String = "",
    val imageUrl: String? = "https://robohash.org/" + System.currentTimeMillis() + ".png?set=set4",
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)