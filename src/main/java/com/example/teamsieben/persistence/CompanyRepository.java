package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Map;

public interface CompanyRepository extends CrudRepository<Company, Long> {

    @Query("SELECT c.wkn as wkn, c.name as name, c.description as description, c.category as category, SUM(i.quantity) as totalQuantity, SUM(i.quantity * i.purchasePrice) / SUM(i.quantity) as averagePurchasePrice FROM Company c JOIN Item i ON c.wkn = i.wkn WHERE c.wkn = ?1 GROUP BY c.wkn, c.name, c.description, c.category")
    Iterable<Map<String, Object>> genralInfo(String wkn);

    boolean existsByWkn(String wkn);

    Company getCompanyByWkn(String wkn);

    @Query("SELECT wkn FROM Company")
    List<String> allWkns();

    @Query("SELECT c.wkn as wkn, c.name as name, c.price as price, SUM(i.quantity) as quantity, SUM(i.quantity * i.purchasePrice) as purchaseTotal FROM Company c JOIN Item i ON c.wkn = i.wkn GROUP BY c.wkn")
    Iterable<Map<String, Object>> getWknNameQuantityPrice();


}
