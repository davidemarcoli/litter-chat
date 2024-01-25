package com.litter.dating.litterchatbackend.security

import com.litter.dating.litterchatbackend.model.entity.User
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException


// This class helps us to validate the generated jwt token
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class JwtAuthFilter : OncePerRequestFilter() {
    @Autowired
    private val jwtService: JwtService? = null

    @Autowired
    private val userDetailsService: UserDetailsService? = null

    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        var token: String? = null
        var userId: String? = null
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            println("authHeader: $authHeader")
            token = authHeader.substring(7).trim()
            userId = jwtService!!.extractSubject(token)
//            println("token: $token")
//            println("username: $userId")
        }
        if (userId != null && SecurityContextHolder.getContext().authentication == null) {
            val userDetails: UserDetails = userDetailsService!!.loadUserByUsername(userId)

            val user: User = userDetails as User

//            println("Token valid: " + jwtService!!.validateToken(token, user))

            if (jwtService!!.validateToken(token, user)) {
                val authToken = UsernamePasswordAuthenticationToken(userDetails, null, userDetails.authorities)
                authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                SecurityContextHolder.getContext().authentication = authToken
            }
        }
        filterChain.doFilter(request, response)
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        return request.servletPath.startsWith("/auth")
    }
}

