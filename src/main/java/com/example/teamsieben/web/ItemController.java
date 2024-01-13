package com.example.teamsieben.web;

import com.example.teamsieben.domain.Item;
//import com.example.teamsieben.persistence.ItemProjection;
import com.example.teamsieben.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/portfolio")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        Item item = itemService.getItemById(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Iterable<Item>> listItems() {
        Iterable<Item> items = itemService.listItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Item> addItem(@RequestBody Item item) {
        Item newItem;
        newItem = itemService.addNewItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Item item = itemService.updatePortfolioItem(id, updatedItem);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //-----------   Test    --------------------
    @GetMapping("/average/{wkn}")
    public ResponseEntity<Double> averageCost(@PathVariable String wkn){
        Double cost = itemService.averageCost(wkn);

        return new ResponseEntity<>(cost, HttpStatus.OK);
    }

    @GetMapping("/total/{wkn}")
    public ResponseEntity<Double> totalCost(@PathVariable String wkn){
        Double total = itemService.totalCost(wkn);
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Map<String, Object>>> allOutput(){
        Iterable<Map<String, Object>> total = itemService.allOutput();
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    @GetMapping("/all/{wkn}")
    public ResponseEntity<Iterable<Map<String, Object>>> itemsWithSameWkn(@PathVariable String wkn){
        Iterable<Map<String, Object>> items = itemService.itemsWithSameWkn(wkn);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    //------------------------------------------
}
