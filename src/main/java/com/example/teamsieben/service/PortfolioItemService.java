package com.example.teamsieben.service;

import com.example.teamsieben.domain.PortfolioItem;
import com.example.teamsieben.persistence.PortfolioItemRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PortfolioItemService {

    private final PortfolioItemRepository portfolioItemRepository;

    public PortfolioItemService(PortfolioItemRepository portfolioItemRepository) {
        this.portfolioItemRepository = portfolioItemRepository;
    }

    public PortfolioItem savePortfolioItem(PortfolioItem item) {
        return portfolioItemRepository.save(item);
    }

    public PortfolioItem getPortfolioItemById(Long id) {
        Optional<PortfolioItem> itemOptional = portfolioItemRepository.findById(id);
        return itemOptional.orElse(null);
    }

    public Iterable<PortfolioItem> getAllPortfolioItems() {
        return portfolioItemRepository.findAll();
    }

    public PortfolioItem updatePortfolioItem(Long id, PortfolioItem updatedItem) {
        Optional<PortfolioItem> itemOptional = portfolioItemRepository.findById(id);

        if (itemOptional.isPresent()) {
            PortfolioItem existingItem = itemOptional.get();
            existingItem.setWkn(updatedItem.getWkn());
            existingItem.setName(updatedItem.getName());
            existingItem.setPurchasePrice(updatedItem.getPurchasePrice());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setCategory(updatedItem.getCategory());
            existingItem.setPurchaseDate(updatedItem.getPurchaseDate());

            return portfolioItemRepository.save(existingItem);
        } else {
            return null; // Portfolio-Item nicht gefunden
        }
    }

    public PortfolioItem addNewPortfolioItem(PortfolioItem item) {
        return savePortfolioItem(item);
    }
    public void deletePortfolioItem(Long id) {
        portfolioItemRepository.deleteById(id);
    }
}
