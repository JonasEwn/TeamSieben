package com.example.teamsieben.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

// Authetifizierung und CORS Mappings werden hier gesetzt

@Configuration
@EnableWebSecurity
public class BasicAuthenticationConfiguration implements WebMvcConfigurer {

    @Bean
    PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        AntPathRequestMatcher h2ConsoleRequestMatcher = new AntPathRequestMatcher("/h2-Console");
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                /*.csrf(httpSecurityCsrfConfigurer ->
                        httpSecurityCsrfConfigurer
                                .ignoringRequestMatchers(h2ConsoleRequestMatcher))*/
                .authorizeHttpRequests(request ->
                        request
                                .requestMatchers(antMatcher("/**")).authenticated()
                )
                .httpBasic(withDefaults());
                httpSecurity.cors(withDefaults());
        return httpSecurity.build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200", "https://hsaa-stock-exchange-service.azurewebsites.net/v1/stocks")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
