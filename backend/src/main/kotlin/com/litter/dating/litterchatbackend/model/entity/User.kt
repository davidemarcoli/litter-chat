package com.litter.dating.litterchatbackend.model.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.beans.ConstructorProperties
import java.time.LocalDateTime

@JsonIgnoreProperties("authorities", "password", ignoreUnknown = true)
data class User @ConstructorProperties("id") constructor(
    @Id
    val id: String? = null,
    val email: String = "",
    private val password: String = "",
    val enabled: Boolean = true,
    val accountNonExpired: Boolean = true,
    val accountNonLocked: Boolean = true,
    val credentialsNonExpired: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now(),
    @DBRef
    val profile: Profile? = null
) : UserDetails {

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return emptyList()
    }

    override fun isEnabled(): Boolean {
        return enabled
    }

    override fun getUsername(): String {
        return email
    }

    override fun isCredentialsNonExpired(): Boolean {
        return credentialsNonExpired
    }

    override fun isAccountNonExpired(): Boolean {
        return accountNonExpired
    }

    override fun isAccountNonLocked(): Boolean {
        return accountNonLocked
    }

    override fun getPassword(): String {
        return password
    }

    fun setPassword(password: String): User {
        return this.copy(password = password)
    }

    fun setProfile(profile: Profile): User {
        return this.copy(profile = profile)
    }


}