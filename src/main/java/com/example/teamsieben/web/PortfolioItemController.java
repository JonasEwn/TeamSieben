package com.example.teamsieben.web;

import com.example.teamsieben.domain.PortfolioItem;
import com.example.teamsieben.service.PortfolioItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/portfolio")
public class PortfolioItemController {

    private final PortfolioItemService portfolioItemService;

    public PortfolioItemController(PortfolioItemService portfolioItemService) {
        this.portfolioItemService = portfolioItemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioItem> getPortfolioItem(@PathVariable Long id) {
        PortfolioItem item = portfolioItemService.getPortfolioItemById(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<PortfolioItem>> getAllPortfolioItems() {
        Iterable<PortfolioItem> items = portfolioItemService.getAllPortfolioItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PortfolioItem> addPortfolioItem(@RequestBody PortfolioItem newItem) {
        PortfolioItem addedItem = portfolioItemService.savePortfolioItem(newItem);
        return new ResponseEntity<>(addedItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PortfolioItem> updatePortfolioItem(@PathVariable Long id, @RequestBody PortfolioItem updatedItem) {
        PortfolioItem item = portfolioItemService.updatePortfolioItem(id, updatedItem);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolioItem(@PathVariable Long id) {
        portfolioItemService.deletePortfolioItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
