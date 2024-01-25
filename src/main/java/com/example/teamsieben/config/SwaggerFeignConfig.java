package com.example.teamsieben.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;


public class SwaggerFeignConfig {

    // Bean gibt dem FeignClient ein header mit dem Api-Key
    @Bean
    public RequestInterceptor requestInterceptor(){

        return requestTemplate -> {
            requestTemplate.header("accept", "*/*");
            requestTemplate.header("Api-Key", "Team#7-ApiKey-3Dg2zqyVdA");
        };
    }
}
