package com.litter.dating.litterchatbackend.config

import com.corundumstudio.socketio.SocketIOServer
import jakarta.annotation.PreDestroy
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.context.ApplicationListener
import org.springframework.context.event.ContextClosedEvent
import org.springframework.stereotype.Component


@Component // TODO: uncomment this line to enable SocketIO server
class ServerCommandLineRunner @Autowired constructor(private val server: SocketIOServer) : CommandLineRunner, ApplicationListener<ContextClosedEvent> {
    @Throws(Exception::class)
    override fun run(vararg args: String) {
        server.start()
    }

//    @PreDestroy
//    fun stopIO() {
//        server.stop()
//    }

    override fun onApplicationEvent(event: ContextClosedEvent) {
        server.stop()
    }
}