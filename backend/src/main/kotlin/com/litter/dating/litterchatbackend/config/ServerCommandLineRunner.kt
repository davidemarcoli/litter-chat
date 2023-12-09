package com.litter.dating.litterchatbackend.config

import com.corundumstudio.socketio.SocketIOServer
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.DependsOn
import org.springframework.stereotype.Component

@Component
class ServerCommandLineRunner @Autowired constructor(private val server: SocketIOServer) : CommandLineRunner {
    @Throws(Exception::class)
    override fun run(vararg args: String) {
        server.start()
    }
}