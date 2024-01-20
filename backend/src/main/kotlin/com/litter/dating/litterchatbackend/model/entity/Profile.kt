package com.litter.dating.litterchatbackend.model.entity

import org.springframework.data.annotation.Id
import java.beans.ConstructorProperties
import java.time.LocalDateTime

data class Profile @ConstructorProperties("id", "name", "bio", "imageUrl", "createdAt", "updatedAt") constructor(
    @Id
    val id: String? = null,
    var name: String? = null,
    var bio: String = "",
    var imageUrl: String? = "https://robohash.org/" + System.currentTimeMillis() + ".png?set=set4",
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)