package com.example.teamsieben.domain;

import jakarta.persistence.*;

// Struktur der User Tabelle
// Mit getter und setter

@Entity
@Table(name = "users")
public class Users {

    @Id
    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    private String name;


    public Users(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    public Users() {

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
