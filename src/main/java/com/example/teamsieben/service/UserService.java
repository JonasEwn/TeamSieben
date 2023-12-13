package com.example.teamsieben.service;

import com.example.teamsieben.domain.Users;
import com.example.teamsieben.persistence.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    //----------------------------------------------------------
    //-----Methoden für Default Get, Post, Put & Delete---------
    public Iterable<Users> listAllUsers(){
        return userRepository.findAll();
    }

    public Users addNewUser(Users user) {
        return userRepository.save(user);
    }

    public Users updateUser(String username, Users updatedUser) {
        Optional<Users> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            Users existingUser = userOptional.get();
            if(updatedUser.getUsername() != null) { existingUser.setUsername(updatedUser.getUsername()); }
            if(updatedUser.getPassword() != null) { existingUser.setPassword(updatedUser.getPassword()); }
            if(updatedUser.getName() != null) { existingUser.setName(updatedUser.getName()); }

            return userRepository.save(existingUser);
        } else {
            return null; // PortfolioItems-Item nicht gefunden
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
