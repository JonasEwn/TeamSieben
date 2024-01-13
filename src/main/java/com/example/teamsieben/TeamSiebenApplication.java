package com.example.teamsieben;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TeamSiebenApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamSiebenApplication.class, args);
    }

}
