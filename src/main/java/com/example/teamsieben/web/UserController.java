package com.example.teamsieben.web;

import com.example.teamsieben.domain.Users;
import com.example.teamsieben.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //----------------------------------------------------------
    //------------Default Get, Post, Put & Delete---------------

    @GetMapping
    public ResponseEntity<Iterable<Users>> listAllUsers() {
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //----------------------------------------------------------
}