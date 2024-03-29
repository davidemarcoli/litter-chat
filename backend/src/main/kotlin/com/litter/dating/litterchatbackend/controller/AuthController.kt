package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.AuthRequest
import com.litter.dating.litterchatbackend.model.entity.User
import com.litter.dating.litterchatbackend.repository.UserRepository
import com.litter.dating.litterchatbackend.security.JwtService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*


@CrossOrigin
@RestController
@RequestMapping("/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val passwordEncoder: BCryptPasswordEncoder,
    private val jwtService: JwtService,
    private val authenticationManager: AuthenticationManager
) {

//    @PostMapping("/login")
//    fun login(@RequestBody authRequest: AuthRequest): ResponseEntity<User> {
//        val user = userRepository.findByEmail(authRequest.email)
//            ?: throw AuthenticationCredentialsNotFoundException("Invalid password")
//
//        if (!passwordEncoder.matches(authRequest.password, user.password)) {
//            throw AuthenticationCredentialsNotFoundException("Invalid password")
//        }
//
//        return ResponseEntity(user, HttpStatus.OK)
//    }

    @PostMapping("/signup")
    fun signup(@RequestBody user: User): ResponseEntity<User> {
        if (userRepository.findByEmail(user.email) != null) {
            return ResponseEntity(HttpStatus.CONFLICT)
        }

        // hash password
        val hashedPassword = passwordEncoder.encode(user.password)
        val userToSave = user.copy(password = hashedPassword)

        val savedUser = userRepository.save(userToSave)
        return ResponseEntity(savedUser, HttpStatus.CREATED)
    }

    @PostMapping("/login")
    fun authenticateAndGetToken(@RequestBody authRequest: AuthRequest): String {
        val user = userRepository.findByEmail(authRequest.email)
            ?: throw UsernameNotFoundException("invalid user request !")

        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                user.id,
                authRequest.password,
                listOf()
            )
        )
        return if (authentication.isAuthenticated) {
            jwtService.generateToken((authentication.principal as User).id!!)
        } else {
            throw UsernameNotFoundException("invalid user request !")
        }

    }
}