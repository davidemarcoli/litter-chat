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

    class Test {
        var id: String? = null
        var name: String? = null
    }

    @PostMapping("create")
    fun createTest(@RequestBody test: Test): ResponseEntity<Profile> {
        var user = userRepository!!.findById(test.id!!).orElseThrow()
        var profile = Profile();
        profile.name = test.name
        profile.bio = "I am " + test.name + "!"
        profile = profileRepository!!.save(profile)
        user = user.setProfile(profile)
        user = userRepository.save(user)
        return ResponseEntity.ok(profile)
    }
}
