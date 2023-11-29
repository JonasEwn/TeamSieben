package com.example.teamsieben.persistence;

import com.example.teamsieben.domain.Company;
import org.springframework.data.repository.CrudRepository;

public interface CompanyRepository extends CrudRepository<Company, Long> {

    //Hier kommen Queries hin
}
