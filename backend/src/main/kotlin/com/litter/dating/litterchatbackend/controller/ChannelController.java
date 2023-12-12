package com.litter.dating.litterchatbackend.controller;

import com.litter.dating.litterchatbackend.model.entity.Channel;
import com.litter.dating.litterchatbackend.model.entity.User;
import com.litter.dating.litterchatbackend.repository.ChannelRepository;
import com.litter.dating.litterchatbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/channel")
public class ChannelController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChannelRepository channelRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Channel>> getChannelsByUserId(@PathVariable("userId") String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(channelRepository.findByMembersContaining(user));
    }

    @PostMapping
    public ResponseEntity<Channel> createChannel(@RequestBody Channel channel) {
        return ResponseEntity.ok(channelRepository.save(channel));
    }

    @DeleteMapping("/{channelId}")
    public ResponseEntity<Void> deleteChannel(@PathVariable("channelId") String channelId) {
        channelRepository.deleteById(channelId);
        return ResponseEntity.ok().build();
    }

}
