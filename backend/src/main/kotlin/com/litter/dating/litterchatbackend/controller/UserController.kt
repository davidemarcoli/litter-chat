package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.Profile
import com.litter.dating.litterchatbackend.model.entity.User
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@RequestMapping("/user")
class UserController(private val userRepository: UserRepository) {
    @CrossOrigin
    @GetMapping("/profile/{id}")
    fun getProfile(@PathVariable id: String): ResponseEntity<Profile> {
        val user = userRepository.findById(id).orElseThrow()
        val profile = user.profile
            ?: throw Exception("Profile not found")
        return ResponseEntity.ok(profile)
    }

    @CrossOrigin
    @GetMapping("/{id}")
    fun getUser(@PathVariable id: String): ResponseEntity<User> {
        val user = userRepository.findById(id).orElseThrow()
        return ResponseEntity.ok(user)
    }
}