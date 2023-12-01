import {Component, OnInit} from '@angular/core';
import {PortfolioItemsService} from "../../shared/services/http/portfolioItems.service";
import {PortfolioItems} from "../../shared/models/portfolioItems";
import {PortfolioCompanies} from "../../shared/models/portfolioCompanies";
import {PortfolioCompaniesService} from "../../shared/services/http/portfolioCompanies.service";
import {AllCompanies} from "../../shared/models/allCompanies";
import {AllCompaniesService} from "../../shared/services/http/allCompanies.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview', // Definiert den Selektor für die Komponente
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {// Deklariert eine Referenz zum MatPaginator und MatSort

  items: PortfolioItems[] = [];
  companies: PortfolioCompanies[] = [];
  all: AllCompanies[] = [];
  displayedColumns: string[] = ['wkn', 'name', 'quantity','average', 'total'];
  constructor(private portfolioItemsService: PortfolioItemsService,
              private portfolioCompaniesService: PortfolioCompaniesService,
              private allCompaniesService: AllCompaniesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.portfolioItemsService.getData().subscribe(data => {
      this.items = data
    });

    this.portfolioCompaniesService.getCompaniesData().subscribe(data =>{
      this.companies = data
    });

    this.allCompaniesService.getData().subscribe(data =>{
      this.all = data
    });
  }

  details(wkn: String){
    console.log(wkn)

    this.router.navigate(['overview/detail', wkn]);
  }
}
