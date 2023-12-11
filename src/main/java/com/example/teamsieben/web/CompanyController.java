package com.example.teamsieben.web;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.domain.Item;
import com.example.teamsieben.persistence.GeneralInfoProjection;
import com.example.teamsieben.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<Iterable<Company>> listCompanies(){
        Iterable<Company> companies = companyService.listCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id){
        Company companies = companyService.getCompanyById(id);
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Company> addItem(@RequestBody Company company) {
        Company newCompany;
        newCompany = companyService.addNewCompany(company);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateItem(@PathVariable Long id, @RequestBody Company updatedCompany) {
        Company company = companyService.updateCompany(id, updatedCompany);
        if (company != null) {
            return new ResponseEntity<>(company, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        companyService.deleteCompany(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/info/{wkn}")
    public ResponseEntity<Iterable<GeneralInfoProjection>> generalInfo(@PathVariable String wkn){
        Iterable<GeneralInfoProjection> info = companyService.generalInfo(wkn);
        return new ResponseEntity<>(info, HttpStatus.OK);
    }

    @GetMapping("/company/{wkn}")
    public ResponseEntity<Company> getCompanyByWkn(@PathVariable String wkn){
        Company info = companyService.getCompanyByWkn(wkn);
        return new ResponseEntity<>(info, HttpStatus.OK);
    }
}
