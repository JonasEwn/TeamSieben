/*
Schnittstelle um auf Datenbank zuzugreifen
 */

package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends CrudRepository<Item, Long> {
    @Query("SELECT id, quantity, purchaseDate, purchasePrice, wkn FROM Item ")
    Iterable<ItemProjection> findItemsWithoutDescriptionAndCategory();

    //----------------------------------------------------
    //      Durchschnittliche Kosten und Gesamtpreis
    //----------------------------------------------------
    @Query("SELECT i.purchasePrice FROM Item i WHERE i.wkn = ?1")
    Iterable<Double> allPrices(@Param("wkn") String wkn);

    @Query("SELECT (CAST(i.quantity AS DOUBLE)) * i.purchasePrice FROM Item i WHERE i.wkn = ?1")
    Iterable<Double> allAmounts(String wkn);

    @Query("SELECT c.name AS name, i.wkn as wkn, SUM(i.quantity) As quantity, AVG(i.purchasePrice) AS average, SUM(i.quantity * i.purchasePrice) AS total FROM Item i JOIN Company c ON c.wkn = i.wkn GROUP BY i.wkn")
    Iterable<ItemProjection> allPricesAndAmounts();
    //----------------------------------------------------
    /*
    SELECT item.wkn, company.name, sum(item.quantity) as quantity, sum(CAST(item.quantity AS DOUBLE) * item.purchase_Price) AS total
    FROM Item
    JOIN Company ON company.wkn = item.wkn
    WHERE item.wkn = '123456'
    GROUP BY item.wkn
    */
}

