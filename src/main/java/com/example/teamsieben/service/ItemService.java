package com.example.teamsieben.service;

import com.example.teamsieben.domain.Item;
import com.example.teamsieben.persistence.ItemProjection;
import com.example.teamsieben.persistence.ItemRepository;
//import com.example.teamsieben.persistence.ItemProjection;
import com.example.teamsieben.persistence.SameWknProjection;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
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


    // -------------------------------------------------
    //     Durchschnittliche Kosten und Gesamtpreis
    // -------------------------------------------------

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

    public Iterable<ItemProjection> allOutput(){
        Iterable<ItemProjection> all = itemRepository.allPricesAndAmounts();
        return all;
    }

    public Iterable<SameWknProjection> itemsWithSameWkn(String wkn){
        Iterable<SameWknProjection> itemsWithSameWkn = itemRepository.itemsWithSameWkn(wkn);
        return itemsWithSameWkn;
    }

    // -------------------------------------------------
    // -------------------------------------------------
}
