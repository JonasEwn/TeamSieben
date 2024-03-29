package com.example.teamsieben.service;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.persistence.CompanyRepository;
import com.example.teamsieben.persistence.SwaggerFeignClient;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CompanyService {

    /* Klasse bearbeitet die Daten die vom Controller gegeben und zurückgegeben werden.
       GET, POST, PUT, DELETE werden hier durchgeführt
    */

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

        // Checkt ob Company Objekt, welches bearbeitet werden soll existiert und setzt dann die neuen Werte.
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

    // Methode läd die entsprechende Company von der externen Datenbank Swagger
    public Map<String, Object> getCompanyDataFromSwagger(String isin){
        Map<String, Object> swagggerObject = swaggerFeignClient.getObject(isin);
        System.out.println(swagggerObject);
        return swagggerObject;
    }

    public boolean checkWknDuplicate(String wkn){
        return companyRepository.existsByWkn(wkn);
    }


    public Iterable<Map<String, Object>> setPriceAndReturnData(){
        // Läd alle wkns aus der Datenbank
        List<String> wkns = companyRepository.allWkns();

        // Iteriert durch alle WKNS und läd den aktuellen Preis vom Swagger
        // Anschließend werden die Preise geupdated und wieder in die Datenbank gespeichert
        for (int i = 0; i <= wkns.size() - 1; i++){
            String wkn = wkns.get(i);
            int price = (int) getCompanyDataFromSwagger(wkn).get("price");

            Company company = getCompanyByWkn(wkn);

            company.setPrice(price);
            saveCompany(company);
        }

        // Läd alle WKNS aus der Datenbank und gibt die Companies als Iterable zurück
        Iterable<Map<String, Object>> getWknNameQuantityPrice = companyRepository.getWknNameQuantityPrice();
        return getWknNameQuantityPrice;
    }

    // Preis für eine einzelne Firma wird aktualisiert
    public void setPrice(String wkn){
        int price = (int) getCompanyDataFromSwagger(wkn).get("price");
        Company company = getCompanyByWkn(wkn);
        company.setPrice(price);
        saveCompany(company);
    }

}
