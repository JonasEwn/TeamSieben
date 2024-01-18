package com.example.teamsieben.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "likesp")
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "company_wkn", nullable = false)
    private Company company;

    @ManyToOne
    @JoinColumn(name = "users_username", nullable = false)
    private Users users;

    public Likes() {
    }

    public Likes(Long id, Company company, Users users) {
        this.id = id;
        this.company = company;
        this.users = users;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
