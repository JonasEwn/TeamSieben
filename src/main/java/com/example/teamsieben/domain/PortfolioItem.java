/*
Stellt Datenbank-Entitätsobjekte dar
 */

package com.example.teamsieben.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class PortfolioItem {
    @Id
    @GeneratedValue
    private Long id;
    private String wkn;
    private String name;
    private double purchasePrice;
    private int quantity;

    public PortfolioItem() {
        // Standardkonstruktor
    }

    public PortfolioItem(String wkn, String name, double purchasePrice, int quantity) {
        this.wkn = wkn;
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
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
}
