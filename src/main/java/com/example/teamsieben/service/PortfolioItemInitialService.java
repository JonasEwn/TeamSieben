/*
Hier stehen die Portfolio-Items
 */

package com.example.teamsieben.service;

import com.example.teamsieben.domain.PortfolioItem;
import com.example.teamsieben.persistence.PortfolioItemRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Calendar;
import java.util.List;

@Service
public class PortfolioItemInitialService {

    private final PortfolioItemRepository portfolioItemRepository;

    public PortfolioItemInitialService(PortfolioItemRepository portfolioItemRepository) {
        this.portfolioItemRepository = portfolioItemRepository;
    }

    @PostConstruct
    public void initializePortfolioItems() {
        // Portfolio-Items erstellen und in die Datenbank speichern
        // Datum ist ein bisschen doof dargestellt, wenn man Jahr 2003 möchte dann 2003 - 1900, für den Monat beachten, dass hier Januar 0 ist und Dezember 11 oder den Monat ausschreiben
        PortfolioItem item1 = new PortfolioItem("123", "A Company", 100.0, 50, "Company A sells Apples", "food", new Date(2023 - 1900, Calendar.OCTOBER , 17));
        PortfolioItem item2 = new PortfolioItem("4567", "B Company", 75.0, 30, "Company B sells bathrooms", "construction", new Date(2023 - 1900, 9, 17));


        portfolioItemRepository.saveAll(
                List.of(item1, item2)
                );
    }
}
