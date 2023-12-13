package com.example.teamsieben.persistence;

import java.util.Date;

public interface ItemProjection {
    String getName();
    String getWkn();
    int getQuantity();
    double getAverage();
    double getTotal();
}
