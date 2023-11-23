import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public wkn: string = "";

  public portfolioList: Portfolio[] = [];         // Speichert die Liste der Portfolios

  displayedColumns: string[] = ['wkn', 'purchaseDate', 'quantity', 'averagePrice', 'totalPrice'];// Definiert die Spalten, die in der Tabelle angezeigt werden sollen

  constructor(
      private portfolioService: PortfolioService,   // Injiziert den PortfolioService
      private route: ActivatedRoute
    ) {
    this.route.params.subscribe( params => this.wkn = params['id']);
  }

  ngOnInit(): void {      // Lifecycle-Hook-Methode ngOnInit wird beim Initialisieren der Komponente aufgerufen
    this.portfolioService
      .getPortfolioList()
      .subscribe((response: Portfolio[]) => {
        this.portfolioList = response.filter(item => item.wkn === this.wkn);;
      });
  }
}