package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Users;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, String> {

    Users findByUsername(String username);

    void deleteByUsername(String username);

}
