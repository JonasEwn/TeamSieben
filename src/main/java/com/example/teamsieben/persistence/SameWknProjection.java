package com.example.teamsieben.persistence;

import java.util.Date;

public interface SameWknProjection {
    Date getPurchaseDate();
    int getQuantity();
    double getPurchasePrice();
    double getTotalPrice();

}
