package com.litter.dating.litterchatbackend.model.entity;

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import java.beans.ConstructorProperties

open class StripeCustomerMapping @ConstructorProperties("id", "user", "stripeCustomerId") constructor(
        @Id
        val id: String? = null,
        @DBRef
        val user: User? = null,
        val stripeCustomerId: String? = null
)
