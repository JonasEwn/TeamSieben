package com.example.teamsieben.service;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.domain.Likes;
import com.example.teamsieben.domain.Users;
import com.example.teamsieben.persistence.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    private final CompanyService companyService;

    public LikeService(LikeRepository likeRepository, CompanyService companyService) {
        this.likeRepository = likeRepository;
        this.companyService = companyService;
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


    public Iterable<Map<String, Object>>  likedCompanies(String username){
        List<String> wkns = likeRepository.getAllWkns();
        // Iteriert durch wkn Liste und aktualisiert Preise
        for (int i = 0; i <= wkns.size() - 1; i++){
            String wkn = wkns.get(i);
            int price = (int) companyService.getCompanyDataFromSwagger(wkn).get("price");

            Company company = companyService.getCompanyByWkn(wkn);

            company.setPrice(price);
            companyService.saveCompany(company);
        }
        Iterable<Map<String, Object>> likedCompanies = likeRepository.likedCompanies(username);

        // Nur Konsolen ausgabe, nicht wichtig
        for (Map<String, Object> company : likedCompanies) {
            System.out.println("Company details:");
            for (Map.Entry<String, Object> entry : company.entrySet()) {
                System.out.println(entry.getKey() + ": " + entry.getValue());
            }
            System.out.println("------");
        }
        return likedCompanies;
    }
}
