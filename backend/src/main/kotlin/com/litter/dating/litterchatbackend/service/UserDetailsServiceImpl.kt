package com.litter.dating.litterchatbackend.service

import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserDetailsServiceImpl: UserDetailsService {
    @Autowired
    private val repository: UserRepository? = null

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        return repository!!.findByEmail(email) ?: throw UsernameNotFoundException("User not found $email");
    }
}