/*
Schnittstelle um auf Datenbank zuzugreifen
 */

package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.PortfolioItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PortfolioItemRepository extends CrudRepository<PortfolioItem, Long> {
    @Query("SELECT id as id, wkn as wkn, name as name, purchasePrice as purchasePrice, quantity as quantity, purchaseDate as purchaseDate FROM PortfolioItem ")
    Iterable<PortfolioItem> findPortfolioItemsWithoutDescriptionAndCategory();
}

