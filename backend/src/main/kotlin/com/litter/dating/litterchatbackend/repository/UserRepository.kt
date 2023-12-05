package com.litter.dating.litterchatbackend.repository

import com.litter.dating.litterchatbackend.model.entity.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String> {
    fun findByEmail(email: String): User?
    fun findByUsername(username: String): User?
}