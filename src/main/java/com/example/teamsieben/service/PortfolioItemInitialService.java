/*
Hier stehen die Portfolio-Items
 */

package com.example.teamsieben.service;

import com.example.teamsieben.domain.PortfolioItem;
import com.example.teamsieben.persistence.PortfolioItemRepository;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class PortfolioItemInitialService {

    private final PortfolioItemRepository portfolioItemRepository;

    public PortfolioItemInitialService(PortfolioItemRepository portfolioItemRepository) {
        this.portfolioItemRepository = portfolioItemRepository;
    }

    @PostConstruct
    public void initializePortfolioItems() {
        // Portfolio-Items erstellen und in die Datenbank speichern
        PortfolioItem item1 = new PortfolioItem("123", "A Company", 100.0, 50);
        PortfolioItem item2 = new PortfolioItem("4567", "B Company", 75.0, 30);

        portfolioItemRepository.save(item1);
        portfolioItemRepository.save(item2);
    }
}
