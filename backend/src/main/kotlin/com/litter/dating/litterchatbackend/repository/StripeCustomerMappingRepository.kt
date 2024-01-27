package com.litter.dating.litterchatbackend.repository

import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.model.entity.StripeCustomerMapping
import com.litter.dating.litterchatbackend.model.entity.User
import org.springframework.data.mongodb.repository.MongoRepository

interface StripeCustomerMappingRepository : MongoRepository<StripeCustomerMapping, String> {
    fun findByUser_Id(userId: String): StripeCustomerMapping?
}