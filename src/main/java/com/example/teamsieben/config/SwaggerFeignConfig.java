package com.example.teamsieben.config;

import feign.Request;
import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;

public class SwaggerFeignConfig {

    @Bean
    public RequestInterceptor requestInterceptor(){

        return requestTemplate -> {
            requestTemplate.header("accept", "*/*");
            requestTemplate.header("Api-Key", "Team#7-ApiKey-3Dg2zqyVdA");
        };
    }
}
