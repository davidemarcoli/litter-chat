package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.model.entity.Profile
import com.litter.dating.litterchatbackend.repository.ChannelRepository
import com.litter.dating.litterchatbackend.repository.ProfileRepository
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin
@RequestMapping("/profile")
class ProfileController {
    @Autowired
    private val userRepository: UserRepository? = null

    @Autowired
    private val profileRepository: ProfileRepository? = null

    @GetMapping
    fun createTest(): ResponseEntity<Profile> {
        var user = userRepository!!.findById("65a6970a3f6c38606094dcb0").get()
        var profile = Profile();
        profile.name = "User 2"
        profile = profileRepository!!.save(profile)
        user = user.setProfile(profile)
        user = userRepository!!.save(user)
        return ResponseEntity.ok(profile)
    }
}
