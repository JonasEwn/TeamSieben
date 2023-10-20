/*
Stellt Datenbank-Entitätsobjekte dar
 */

package com.example.teamsieben.domain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class PortfolioItem {
    @Id
    @GeneratedValue
    private Long id;
    private String wkn;
    private String name;
    private double purchasePrice;
    private int quantity;
    @Column
    private String description;
    private String category;
    @Column
    @Temporal(TemporalType.DATE)
    private Date purchaseDate;

    public PortfolioItem() {
        // Standardkonstruktor
    }

    public PortfolioItem(String wkn, String name, double purchasePrice, int quantity, String description, String category, Date purchaseDate) {
        this.wkn = wkn;
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
        this.purchaseDate = purchaseDate;
    }

    public Long getId() {
        return id;
    }

    public String getWkn() {
        return wkn;
    }
    public void setWkn(String wkn) {
        this.wkn = wkn;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public double getPurchasePrice() {
        return purchasePrice;
    }
    public void setPurchasePrice(double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;}
    public void setDescription(String description) {
        this.description = description;}

    public String getCategory() {
        return category;}
    public void setCategory(String category) {
        this.category = category;}

    public Date getPurchaseDate() {
        return purchaseDate;}
    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;}
}
