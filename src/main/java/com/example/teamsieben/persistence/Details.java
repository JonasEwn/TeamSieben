package com.example.teamsieben.persistence;

// This is a Projection for the Details Service. Exception because price might have to be changed.
// Normally we replace Projections with Map<String, Object>

public interface Details {
    String getWkn();
    String getName();
    String getCategory();
    String getDescription();
    int getPrice();
    int getQuantity();
    double getAveragePrice();


}
