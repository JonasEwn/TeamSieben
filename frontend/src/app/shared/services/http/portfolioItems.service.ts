import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {PortfolioItems} from "../../models/portfolioItems";

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
    console.log('SendData() wurde ausgeführt');
    return this.itemsHttp.post(this.itemsPostUrl, data);
  }
}
