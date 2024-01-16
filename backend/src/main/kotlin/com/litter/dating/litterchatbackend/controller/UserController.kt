package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.Profile
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/user")
class UserController(private val userRepository: UserRepository) {
    @GetMapping("/profile/{id}")
    fun getProfile(@PathVariable id: String): ResponseEntity<Profile> {
        val user = userRepository.findById(id).orElseThrow()
        val profile = user.profile
            ?: throw Exception("Profile not found")
        return ResponseEntity(profile, HttpStatus.OK)
    }
}