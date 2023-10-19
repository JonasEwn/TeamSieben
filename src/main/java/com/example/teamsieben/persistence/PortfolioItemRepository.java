/*
Schnittstelle um auf Datenbank zuzugreifen
 */

package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.PortfolioItem;
import org.springframework.data.repository.CrudRepository;

public interface PortfolioItemRepository extends CrudRepository<PortfolioItem, Long> {
}
