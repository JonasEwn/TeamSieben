package com.example.teamsieben.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AndRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class BasicAuthenticationConfiguration {

    @Bean
    PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        AntPathRequestMatcher h2ConsoleRequestMatcher = new AntPathRequestMatcher("/**");
        httpSecurity
                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.ignoringRequestMatchers(h2ConsoleRequestMatcher))
                .authorizeHttpRequests(request ->
                        request
                                .requestMatchers(new AntPathRequestMatcher("/companies/**")).permitAll()
                                .requestMatchers(new AntPathRequestMatcher("/users/**")).hasAuthority("John Doe")
                ).httpBasic(Customizer.withDefaults());
        return httpSecurity.build();
    }
}
