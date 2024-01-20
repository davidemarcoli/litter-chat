package com.litter.dating.litterchatbackend.model.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.beans.ConstructorProperties
import java.time.LocalDateTime

@JsonIgnoreProperties("authorities", "password")
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

    @JsonIgnore
    override fun isEnabled(): Boolean {
        return enabled
    }

    @JsonIgnore
    override fun getUsername(): String {
        return email
    }

    @JsonIgnore
    override fun isCredentialsNonExpired(): Boolean {
        return credentialsNonExpired
    }

    @JsonIgnore
    override fun isAccountNonExpired(): Boolean {
        return accountNonExpired
    }

    @JsonIgnore
    override fun isAccountNonLocked(): Boolean {
        return accountNonLocked
    }

    @JsonIgnore
    override fun getPassword(): String {
        return password
    }

    @JsonIgnore
    fun setPassword(password: String): User {
        return this.copy(password = password)
    }

    @JsonIgnore
    fun setProfile(profile: Profile): User {
        return this.copy(profile = profile)
    }
}