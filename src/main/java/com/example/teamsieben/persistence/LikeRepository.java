package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.domain.Likes;
import com.example.teamsieben.domain.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface LikeRepository extends CrudRepository<Likes, Long> {

    @Query("SELECT new com.example.teamsieben.domain.Company(c.id, c.wkn, c.name, c.description, c.category, c.price) FROM Company c WHERE c.wkn = ?1")
    Company company(String wkn);

    @Query("SELECT new com.example.teamsieben.domain.Users(u.username, u.name, u.password) FROM Users u WHERE u.username = ?1")
    Users users(String username);

    Iterable<Likes> getLikesByUsersUsername(String username);

    Likes getLikeByCompanyWknAndUsersUsername(String wkn, String username);

}
