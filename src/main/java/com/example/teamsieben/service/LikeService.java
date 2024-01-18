package com.example.teamsieben.service;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.domain.Likes;
import com.example.teamsieben.domain.Users;
import com.example.teamsieben.persistence.LikeRepository;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public Likes addLike(String wkn, String username) {
        Users users = likeRepository.users(username);
        Company company = likeRepository.company(wkn);
        System.out.println("User: " + users.getUsername() + " liked " + company.getWkn());
        Likes likes = new Likes();
        likes.setCompany(company);
        likes.setUsers(users);
        return likeRepository.save(likes);
    }

    public void deleteLike(String wkn, String username){
        Likes likes = likeRepository.getLikeByCompanyWknAndUsersUsername(wkn, username);
        likeRepository.deleteById(likes.getId());
    }

    public Iterable<Likes> getLike(String username){
        Iterable<Likes> like = likeRepository.getLikesByUsersUsername(username);
        return like;
    }
}
