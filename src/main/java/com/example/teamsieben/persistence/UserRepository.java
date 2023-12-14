package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Objects;
import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, String> {

    Users findByUsername(String username);


    @Query("SELECT username as username, password as password FROM Users WHERE username = ?1 and password = ?2")
    Object searchByUsername(String username, String password);
}
