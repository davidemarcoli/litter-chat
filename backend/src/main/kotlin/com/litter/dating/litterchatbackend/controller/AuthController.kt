package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.LoginRequest
import com.litter.dating.litterchatbackend.model.entity.User
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/auth")
class AuthController(private val userRepository: UserRepository, private val passwordEncoder: BCryptPasswordEncoder) {

    @PostMapping("/login")
    fun login(@RequestBody loginRequest: LoginRequest): ResponseEntity<User> {
        val user = userRepository.findByUsername(loginRequest.username)
            ?: throw AuthenticationCredentialsNotFoundException("Invalid password")

        if (!passwordEncoder.matches(loginRequest.password, user.password)) {
            throw AuthenticationCredentialsNotFoundException("Invalid password")
        }

        return ResponseEntity(user, HttpStatus.OK)
    }

    @PostMapping("/register")
    fun register(@RequestBody user: User): ResponseEntity<User> {
        // hash password
        val hashedPassword = passwordEncoder.encode(user.password)
        val userToSave = user.copy(password = hashedPassword)

        val savedUser = userRepository.save(userToSave)
        return ResponseEntity(savedUser, HttpStatus.CREATED)
    }
}