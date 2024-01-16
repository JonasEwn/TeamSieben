/*
Schnittstelle um auf Datenbank zuzugreifen
 */

package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

public interface ItemRepository extends CrudRepository<Item, Long> {
    @Query("SELECT id, quantity, purchaseDate, purchasePrice, wkn FROM Item ")
    Iterable<Map<String, Object>> findItemsWithoutDescriptionAndCategory();

    //----------------------------------------------------
    //      Durchschnittliche Kosten und Gesamtpreis
    //----------------------------------------------------
    @Query("SELECT i.purchasePrice FROM Item i WHERE i.wkn = ?1")
    Iterable<Double> allPrices(@Param("wkn") String wkn);

    @Query("SELECT (CAST(i.quantity AS DOUBLE)) * i.purchasePrice FROM Item i WHERE i.wkn = ?1")
    Iterable<Double> allAmounts(String wkn);

    @Query("SELECT c.name AS name, i.wkn as wkn, SUM(i.quantity) As quantity, AVG(i.purchasePrice) AS average, SUM(i.quantity * i.purchasePrice) AS total FROM Item i JOIN Company c ON c.wkn = i.wkn GROUP BY i.wkn")
    Iterable<Map<String, Object>> allPricesAndAmounts();

    @Query("Select quantity as quantity, purchaseDate as purchaseDate, purchasePrice as purchasePrice, ((CAST(quantity AS DOUBLE)) * purchasePrice) as totalPrice FROM Item WHERE wkn = ?1")
    Iterable<Map<String, Object>> itemsWithSameWkn(String wkn);

    @Query("SELECT c.wkn as wkn, SUM(i.quantity) as quantity, c.name as name FROM Item i JOIN Company c ON i.wkn = c.wkn GROUP BY i.wkn")
    List<Map<String, Object>> wknNameQuantity();

    //----------------------------------------------------
    /*
    SELECT item.wkn, company.name, sum(item.quantity) as quantity, sum(CAST(item.quantity AS DOUBLE) * item.purchase_Price) AS total
    FROM Item
    JOIN Company ON company.wkn = item.wkn
    WHERE item.wkn = '123456'
    GROUP BY item.wkn
    */
}

