package com.example.teamsieben.service;

import com.example.teamsieben.domain.Company;
import com.example.teamsieben.persistence.CompanyRepository;
import com.example.teamsieben.persistence.GeneralInfoProjection;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
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

    public Iterable<GeneralInfoProjection> generalInfo(String wkn){
        Iterable<GeneralInfoProjection> info = companyRepository.genralInfo(wkn);
        return info;
    }

    public Company getCompanyByWkn(String wkn){
        Company info = companyRepository.getCompanyByWkn(wkn);
        return info;
    }
}
