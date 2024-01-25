/*
Stellt Datenbank-Entitätsobjekte dar
 */

package com.example.teamsieben.domain;

import jakarta.persistence.*;

import java.util.Date;

// Struktur der Item Tabelle
// Mit getter und setter

@Entity
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String wkn;
    private double purchasePrice;
    private int quantity;

    @Column
    @Temporal(TemporalType.DATE)
    private Date purchaseDate;


    public Item() {
    }

    public Item(String wkn, double purchasePrice, int quantity, Date purchaseDate) {
        this.wkn = wkn;
        this.purchasePrice = purchasePrice;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
    }

    public Long getId() {
        return id;
    }

    //public void setId(Long id){this.id = id;}

    public String getWkn() {
        return wkn;
    }
    public void setWkn(String wkn) {
        this.wkn = wkn;
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

    public Date getPurchaseDate() {
        return purchaseDate;}
    public void setPurchaseDate(Date purchaseDate) {
        this.purchaseDate = purchaseDate;}
}
