package com.example.teamsieben.domain;
import java.util.Date;

public interface PortfolioItemList {
    Long getId();
    String getWkn();
    String getName();
    double getPurchasePrice();
    int getQuantity();
    Date getPurchaseDate();
}

