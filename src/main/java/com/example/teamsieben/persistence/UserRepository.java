package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Users;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Objects;
import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, String> {

    Users findByUsername(String username);

    void deleteByUsername(String username);

}
