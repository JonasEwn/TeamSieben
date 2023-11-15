import { Injectable } from '@angular/core';
import { Portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';

// This service is used to get the portfolio list.
// It is used in the overview.component.ts.
// It is a standalone service.
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  portfolioList: Portfolio[] = [];

  constructor() {}

  /**
   * Get portfolio list (from mock).
   * @returns Observable<Portfolio[]>
   */
  public getPortfolioList(): Observable<Portfolio[]> {
    this.generatePortfolioList(); // MOCK
    return new Observable<Portfolio[]>((subscriber) => {
      subscriber.next(this.portfolioList);
      subscriber.complete();
    });
  }

  public addPortfolio(): Observable<Portfolio> {
    return new Observable<Portfolio>(() => {
      // TODO
      console.log('addPortfolio clicked');
    });
  }

  /**
   * Generate random portfolio list. */
  
  private generatePortfolioList(): void {
    for (let i = 1; i <= 6; i++) { 
      if (i ==1) {
      const newItem: Portfolio = {
        id: `ID${i}`,
        name: 'Allianz',
        price: '100',
        wkn: '123456',
        quantity: '100',
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '01.11.2023'
        
        }
        this.portfolioList.push(newItem);
    } else if (i == 2) {
      const newItem: Portfolio = {
        id: `ID${i}`,
        name: 'Allianz',
        price: '200',
        wkn: '123456',
        quantity: '200',
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '02.11.2023'
        }
        this.portfolioList.push(newItem);
    }
    else if (i == 3) {
      const newItem: Portfolio = {
        id: `ID${i}`,
        name: 'BASF',
        price: '50',
        wkn: '987654',
        quantity: '50',
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '02.11.2023'
        }
        this.portfolioList.push(newItem);
  }
  else if (i == 4) {
    const newItem: Portfolio = {
      id: `ID${i}`,
      name: 'BASF',
      price: '100',
      wkn: '987654',
      quantity: '40',
      description: 'Chemie Unternehmen',
      category: 'Aktie',
      purchaseDate: '02.11.2023'
      }
      this.portfolioList.push(newItem);
}
else if (i == 5) {
  const newItem: Portfolio = {
    id: `ID${i}`,
    name: 'BASF',
    price: '30',
    wkn: '987654',
    quantity: '200',
    description: 'Chemie Unternehmen',
    category: 'Aktie',
    purchaseDate: '03.11.2023'
    }
    this.portfolioList.push(newItem);
}
else if (i == 6) {
  const newItem: Portfolio = {
    id: `ID${i}`,
    name: 'Bitcoin',
    price: '32000',
    wkn: 'BTC',
    quantity: '1',
    description: 'Kryptowährung',
    category: 'Crypto',
    purchaseDate: '03.11.2023'
    }
    this.portfolioList.push(newItem);
}
    }
  }

}