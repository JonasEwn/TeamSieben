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
   * Generate random portfolio list.
   */
  private generatePortfolioList(): void {
    this.portfolioList = [
      {
        id: 'ID1',
        name: 'Allianz',
        price: '100',
        wkn: '123456',
        quantity: '100',
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '01.11.2023',
      },
      {
        id: 'ID2',
        name: 'Allianz',
        price: '200',
        wkn: '123456',
        quantity: '200',
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
      },
      {
        id: 'ID3',
        name: 'BASF',
        price: '50',
        wkn: '987654',
        quantity: '50',
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
      },
      {
        id: 'ID4',
        name: 'BASF',
        price: '40',
        wkn: '987654',
        quantity: '100',
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
      },
      {
        id: 'ID5',
        name: 'BASF',
        price: '30',
        wkn: '987654',
        quantity: '200',
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '03.11.2023',
      },
      {
        id: 'ID6',
        name: 'Bitcoin',
        price: '32000',
        wkn: 'BTC',
        quantity: '1',
        description: 'Kryptowährung',
        category: 'Crypto',
        purchaseDate: '03.11.2023',
      },
    ];

    // calculate average price for each WKN
    for (const [wkn, portfolios] of this.portfolioList.reduce((acc, portfolio) => {
      const portfolioMap = acc.get(portfolio.wkn);
      if (!portfolioMap) {
        acc.set(portfolio.wkn, [portfolio]);
      } else {
        portfolioMap.push(portfolio);
      }
      return acc;
    }, new Map())) {
      let totalPrice = 0;
      let totalQuantity = 0;

      for (const portfolio of portfolios) {
        totalPrice += parseFloat(portfolio.price) * portfolio.quantity;
        totalQuantity += portfolio.quantity;
      }

      const averagePrice = totalPrice / totalQuantity;

      for (const portfolio of portfolios) {
        portfolio.price = averagePrice.toFixed(2);
      }
    }
  }
}