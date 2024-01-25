package com.example.teamsieben.service;

import com.example.teamsieben.domain.Item;
import com.example.teamsieben.persistence.Details;
import com.example.teamsieben.persistence.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemService {

    /* Klasse bearbeitet die Daten die vom ItemController Controller gegeben und zurückgegeben werden sollen.
       GET, POST, PUT, DELETE werden hier durchgeführt
    */

    private final ItemRepository itemRepository;
    private final CompanyService companyService;

    public ItemService(ItemRepository itemRepository, CompanyService companyService) {
        this.itemRepository = itemRepository;
        this.companyService = companyService;
    }

    public Item saveItem(Item item) {
        return itemRepository.save(item);
    }

    public Item getItemById(Long id) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        return itemOptional.orElse(null);
    }

    public Iterable<Item> listItems() {
        return itemRepository.findAll();
    }

    // Checkt ob Company Objekt, welches bearbeitet werden soll existiert und setzt dann die neuen Werte.
    public Item updatePortfolioItem(Long id, Item updatedItem) {
        Optional<Item> itemOptional = itemRepository.findById(id);

        if (itemOptional.isPresent()) {
            Item existingItem = itemOptional.get();
            if(updatedItem.getWkn() != null) { existingItem.setWkn(updatedItem.getWkn()); }
            if(updatedItem.getPurchasePrice() != 0) { existingItem.setPurchasePrice(updatedItem.getPurchasePrice()); }
            if(updatedItem.getQuantity() != 0) { existingItem.setQuantity(updatedItem.getQuantity()); }

            return itemRepository.save(existingItem);
        } else {
            return null; // PortfolioItems-Item nicht gefunden
        }
    }

    public Item addNewItem(Item item) {
        return saveItem(item);
    }
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }


    public double averageCost(String wkn){
        Iterable<Double> prices = itemRepository.allPrices(wkn);
        double averagePrice = 0.0;
        double n = 0.0;
        for (double val : prices){
            averagePrice += val;
            n++;
        }
        averagePrice = averagePrice / n;
        return averagePrice;
    }

    public double totalCost(String wkn){
        Iterable<Double> amounts = itemRepository.allAmounts(wkn);
        double total = 0.0;
        for(Double amount : amounts){
            total += amount;
        }
        return total;
    }

    public Iterable<Map<String, Object>> allOutput(){
        Iterable<Map<String, Object>> all = itemRepository.allPricesAndAmounts();
        return all;
    }

    public Iterable<Map<String, Object>> itemsWithSameWkn(String wkn){
        Iterable<Map<String, Object>> itemsWithSameWkn = itemRepository.itemsWithSameWkn(wkn);
        return itemsWithSameWkn;
    }

    // Bevor Item abgefragt wird, wird der Preis aktualisiert
    public Details details(String wkn){
        companyService.setPrice(wkn);
        Details details = itemRepository.details(wkn);
        return details;
    }
}
