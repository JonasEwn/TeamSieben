import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PortfolioItems} from "../../models/portfolioItems";

// Deklariert den PortfolioItemsService als Injectable-Service
@Injectable({
  providedIn: 'root',
})

export class PortfolioItemsService {

  private itemsUrl = `http://localhost:8080/portfolio`;

  constructor(private itemsHttp: HttpClient) {
  }

  getData(): Observable<PortfolioItems[]>{
    return this.itemsHttp.get<PortfolioItems[]>(this.itemsUrl);
  }
}
