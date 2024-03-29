package com.example.teamsieben.web;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.teamsieben.domain.Users;
import com.example.teamsieben.persistence.SwaggerFeignClient;
import com.example.teamsieben.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    /* Alle Anfragen zu den Benutzer werden hier bearbeitet
       URL: Localhost:8080/users/...
    */

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //----------------------------------------------------------
    //------------Default Get, Post, Put & Delete---------------

    @GetMapping
    public ResponseEntity<Iterable<Users>> listAllUsers() {
        System.out.println( "Ich bin hier " );
        Iterable<Users> users = userService.listAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Users> addUser(@RequestBody Users user) {
        Users newUser;
        newUser = userService.addNewUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/{username}")
    public ResponseEntity<Users> updateUser(@PathVariable String username, @RequestBody Users updatedUser) {
        Users user = userService.updateUser(username, updatedUser);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
