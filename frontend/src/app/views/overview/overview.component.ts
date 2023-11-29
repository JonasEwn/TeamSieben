import {Component, OnInit} from '@angular/core';
import {PortfolioItemsService} from "../../shared/services/http/portfolioItems.service";
import {PortfolioItems} from "../../shared/models/portfolioItems";
import {PortfolioCompanies} from "../../shared/models/portfolioCompanies";
import {PortfolioCompaniesService} from "../../shared/services/http/portfolioCompanies.service";

@Component({
  selector: 'app-overview', // Definiert den Selektor für die Komponente
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {// Deklariert eine Referenz zum MatPaginator und MatSort

  items: PortfolioItems[] = [];
  companies: PortfolioCompanies[] = [];
  displayedColumns: string[] = ['wkn', 'name', 'quantity'];
  constructor(private portfolioItemsService: PortfolioItemsService,
              private portfolioCompaniesService: PortfolioCompaniesService) {
  }

  ngOnInit(): void {
    this.portfolioItemsService.getData().subscribe(data => {
      this.items = data
    });

    this.portfolioCompaniesService.getCompaniesData().subscribe(data =>{
      this.companies = data
    });
  }
}
