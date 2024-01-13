package com.example.teamsieben.service;

import com.example.teamsieben.domain.Users;
import com.example.teamsieben.persistence.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

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
        Optional<Users> userOptional = userRepository.findById(username);

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

    @Transactional
    public void deleteUser(String username) {
        userRepository.deleteByUsername(username);
    }

    //----------------------------------------------------------
    //----------------------------------------------------------
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username);
        if(user != null){
            return new User(user.getUsername(), user.getPassword(), getNameAndRole(user.getName()));
        } else {
            throw new UsernameNotFoundException("Username not found");
        }
    }

    private List<GrantedAuthority> getNameAndRole(String name) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(name));
        return authorities;
    }

    //----------------------------------------------------------
}
