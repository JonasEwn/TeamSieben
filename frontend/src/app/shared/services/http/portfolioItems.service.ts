import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PortfolioItems} from "../../models/portfolioItems";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

// Deklariert den PortfolioItemsService als Injectable-Service
@Injectable({
  providedIn: 'root',
})

export class PortfolioItemsService {

  private itemsUrl = `http://localhost:8080/portfolio`;
  public itemsPostUrl = "http://localhost:8080/portfolio";

  constructor(private itemsHttp: HttpClient) {
  }

  getData(): Observable<PortfolioItems[]>{
    return this.itemsHttp.get<PortfolioItems[]>(this.itemsUrl);
  }

  sendData(data: any){
    data = Object.assign({},...data);
    return this.itemsHttp.post<PortfolioItems>(this.itemsPostUrl, data);
  }
}
