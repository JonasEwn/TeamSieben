package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CompanyRepository extends CrudRepository<Company, Long> {

    //Hier kommen Queries hin
    @Query("SELECT c.wkn as wkn, c.name as name, c.description as description, c.category as category, SUM(i.quantity) as totalQuantity, SUM(i.quantity * i.purchasePrice) / SUM(i.quantity) as averagePurchasePrice FROM Company c JOIN Item i ON c.wkn = i.wkn WHERE c.wkn = ?1 GROUP BY c.wkn, c.name, c.description, c.category")
    Iterable<GeneralInfoProjection> genralInfo(String wkn);


    Company getCompanyByWkn(String wkn);

}
