package com.example.teamsieben.service;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.domain.Item;
import com.example.teamsieben.persistence.CompanyRepository;
import com.example.teamsieben.persistence.SwaggerFeignClient;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    private final SwaggerFeignClient swaggerFeignClient;


    public CompanyService(CompanyRepository companyRepository, SwaggerFeignClient swaggerFeignClient) {
        this.companyRepository = companyRepository;
        this.swaggerFeignClient = swaggerFeignClient;
    }

    public Company saveCompany(Company company){
        return companyRepository.save(company);
    }

    public Iterable<Company> listCompanies(){
        return companyRepository.findAll();
    }
    public Company getCompanyById(Long id){
        Optional<Company> companyOptional = companyRepository.findById(id);
        return companyOptional.orElse(null);
    }

    public Company updateCompany(Long id, Company updatedCompany){
        Optional<Company> companyOptional = companyRepository.findById(id);

        if (companyOptional.isPresent() && isInputValid(updatedCompany.getDescription())){
            Company existingCompany = companyOptional.get();
            existingCompany.setWkn(updatedCompany.getWkn());
            existingCompany.setName(updatedCompany.getName());
            existingCompany.setDescription(updatedCompany.getDescription());
            existingCompany.setCategory(updatedCompany.getCategory());

            return companyRepository.save(existingCompany);
        } else {
            return null;
        }
    }

    public Company addNewCompany(Company company){
        if(isInputValid(company.getDescription())){

            return saveCompany(company);
        }
        else {
            return null;
        }
    }

    public void deleteCompany(Long id){
        companyRepository.deleteById(id);
    }

    public boolean isInputValid(String description){
        // Funktion testet ob Description-Input kleiner als 255 ist
        return description == null || description.length() <= 255;
    }

    public Iterable<Map<String, Object>> generalInfo(String wkn){
        Iterable<Map<String, Object>> info = companyRepository.genralInfo(wkn);
        return info;
    }

    public Company getCompanyByWkn(String wkn){
        Company info = companyRepository.getCompanyByWkn(wkn);
        return info;
    }

    public Map<String, Object> getCompanyDataFromSwagger(String isin){
        Map<String, Object> swagggerObject = swaggerFeignClient.getObject(isin);
        System.out.println(swagggerObject);
        return swagggerObject;
    }

    public boolean checkWknDuplicate(String wkn){
        return companyRepository.existsByWkn(wkn);
    }


    public Iterable<Map<String, Object>> setPriceAndReturnData(){
        List<String> wkns = companyRepository.allWkns();
        for (int i = 0; i <= wkns.size() - 1; i++){
            String wkn = wkns.get(i);
            int price = (int) getCompanyDataFromSwagger(wkn).get("price");

            Company company = getCompanyByWkn(wkn);

            company.setPrice(price);
            saveCompany(company);
        }
        Iterable<Map<String, Object>> getWknNameQuantityPrice = companyRepository.getWknNameQuantityPrice();
        return getWknNameQuantityPrice;
    }

}
