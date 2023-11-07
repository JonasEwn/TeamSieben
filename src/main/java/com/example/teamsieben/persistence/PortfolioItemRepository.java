/*
Schnittstelle um auf Datenbank zuzugreifen
 */

package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.PortfolioItemList;
import com.example.teamsieben.domain.PortfolioItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PortfolioItemRepository extends CrudRepository<PortfolioItem, Long> {
    @Query("SELECT p.id as id, p.wkn as wkn, p.name as name, p.purchasePrice as purchasePrice, p.quantity as quantity, p.purchaseDate as purchaseDate FROM PortfolioItem p")
    Iterable<PortfolioItemList> findPortfolioItemsWithoutDescriptionAndCategory();
}

