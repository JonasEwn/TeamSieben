package com.example.teamsieben.persistence;

public interface GeneralInfoProjection {

    String getWkn();
    String getDescription();
    String getCategory();
    String getName();
    Double getAveragePurchasePrice();

    Double getTotalQuantity();
}
