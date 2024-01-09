package com.litter.dating.litterchatbackend.controller

import com.litter.dating.litterchatbackend.model.entity.Channel
import com.litter.dating.litterchatbackend.repository.ChannelRepository
import com.litter.dating.litterchatbackend.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/channel")
class ChannelController {
    @Autowired
    private val userRepository: UserRepository? = null

    @Autowired
    private val channelRepository: ChannelRepository? = null
    @GetMapping("/user/{userId}")
    fun getChannelsByUserId(@PathVariable("userId") userId: String): ResponseEntity<List<Channel>> {
        val user = userRepository!!.findById(userId).orElse(null)
            ?: return ResponseEntity.notFound()
                .build()
        return ResponseEntity.ok(
            channelRepository!!.findByMembersContaining(user)
        )
    }

    @GetMapping
    fun getAllChannels(): ResponseEntity<List<Channel>> {
        return ResponseEntity.ok(channelRepository!!.findAll())
    }

    @PostMapping
    fun createChannel(@RequestBody channel: Channel): ResponseEntity<Channel> {
        return ResponseEntity.ok(channelRepository!!.save(channel))
    }

    @DeleteMapping("/{channelId}")
    fun deleteChannel(@PathVariable("channelId") channelId: String): ResponseEntity<Void> {
        channelRepository!!.deleteById(channelId)
        return ResponseEntity.ok().build()
    }
}
