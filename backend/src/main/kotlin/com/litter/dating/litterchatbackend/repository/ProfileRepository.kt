package com.litter.dating.litterchatbackend.repository

import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.model.entity.Profile
import com.litter.dating.litterchatbackend.model.entity.User
import org.springframework.data.mongodb.repository.MongoRepository

interface ProfileRepository : MongoRepository<Profile, String> {
}