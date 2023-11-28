package com.litter.dating.litterchatbackend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories

@SpringBootApplication
@EnableMongoRepositories(basePackages = ["com.litter.dating.litterchatbackend.repository"])
class LitterChatBackendApplication

fun main(args: Array<String>) {
	runApplication<LitterChatBackendApplication>(*args)
}
