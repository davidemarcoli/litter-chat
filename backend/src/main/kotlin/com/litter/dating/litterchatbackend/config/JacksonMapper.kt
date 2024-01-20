package com.litter.dating.litterchatbackend.config;

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
class JacksonMapper {
    @Bean
    fun mapper(): ObjectMapper {
        val mapper = ObjectMapper()
        mapper.registerModule(KotlinModule.Builder().build())
        mapper.registerModule(JavaTimeModule())
        mapper.findAndRegisterModules()
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper
    }
}
