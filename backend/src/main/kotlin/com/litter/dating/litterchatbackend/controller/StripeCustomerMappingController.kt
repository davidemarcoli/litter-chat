package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.StripeCustomerMapping
import com.litter.dating.litterchatbackend.model.StripeCustomerMappingRequest
import com.litter.dating.litterchatbackend.repository.StripeCustomerMappingRepository
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/stripe-customer-mapping")
class StripeCustomerMappingController {
    @Autowired
    private val userRepository: UserRepository? = null

    @Autowired
    private val stripeCustomerMappingRepository: StripeCustomerMappingRepository? = null

    @PostMapping
    fun createStripeCustomerMapping(@RequestBody stripeCustomerMappingRequest: StripeCustomerMappingRequest): ResponseEntity<StripeCustomerMapping> {
        val user = userRepository!!.findById(stripeCustomerMappingRequest.userId!!).orElse(null)
            ?: return ResponseEntity.badRequest().build()
        val stripeCustomerMapping =
            stripeCustomerMappingRepository!!.findByUser_Id(stripeCustomerMappingRequest.userId!!)
        if (stripeCustomerMapping != null) {
            return ResponseEntity.ok().body(stripeCustomerMapping)
        }
        val newStripeCustomerMapping = stripeCustomerMappingRepository.save(
            StripeCustomerMapping(
                user = user,
                stripeCustomerId = stripeCustomerMappingRequest.stripeCustomerId
            )
        )
        return ResponseEntity.ok().body(newStripeCustomerMapping)
    }

    @GetMapping("/{userId}")
    fun getStripeCustomerMapping(@PathVariable userId: String): ResponseEntity<StripeCustomerMapping> {
        val stripeCustomerMapping = stripeCustomerMappingRepository!!.findByUser_Id(userId)
            ?: return ResponseEntity.notFound().build()
        println(stripeCustomerMapping)
        return ResponseEntity.ok().body(stripeCustomerMapping)
    }
}
