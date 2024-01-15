package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.Profile
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/user")
class UserController(private val userRepository: UserRepository) {
    @GetMapping("profile/{username}")
    fun getProfile(@PathVariable username: String): ResponseEntity<Profile> {
        val user = userRepository.findByUsername(username)
            ?: throw Exception("User not found")
        val profile = user.profile
            ?: throw Exception("Profile not found")
        return ResponseEntity(profile, HttpStatus.OK)
    }
}