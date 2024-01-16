package com.example.teamsieben.web;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.persistence.SwaggerFeignClient;
import com.example.teamsieben.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
    public ResponseEntity<Iterable<Map<String, Object>>> generalInfo(@PathVariable String wkn){
        Iterable<Map<String, Object>> info = companyService.generalInfo(wkn);
        return new ResponseEntity<>(info, HttpStatus.OK);
    }

    @GetMapping("/company/{wkn}")
    public ResponseEntity<Company> getCompanyByWkn(@PathVariable String wkn){
        Company info = companyService.getCompanyByWkn(wkn);
        return new ResponseEntity<>(info, HttpStatus.OK);
    }



    @GetMapping("/swagger/{isin}")
    public ResponseEntity<Map<String, Object>> getCompanyDataFromSwagger(@PathVariable String isin){
        Map<String, Object> company = companyService.getCompanyDataFromSwagger(isin);
        if(company == null || company.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(company, HttpStatus.OK);
        }
    }

    @GetMapping("/duplicate/{wkn}")
    public ResponseEntity<Boolean> checkWknDuplicate(@PathVariable String wkn){
        boolean wknDuplicate = companyService.checkWknDuplicate(wkn);
        return new ResponseEntity<>(wknDuplicate, HttpStatus.OK);
    }

    @GetMapping("/prices")
    public ResponseEntity<Iterable<Map<String, Object>>> getWknNameQuantityPrice(){
        Iterable<Map<String, Object>> allWknNameQuantityPrices = companyService.setPriceAndReturnData();
        return new ResponseEntity<>(allWknNameQuantityPrices, HttpStatus.OK);
    }
}
