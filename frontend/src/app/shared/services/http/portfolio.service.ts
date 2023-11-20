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


  private generatePortfolioList(): void {
    this.portfolioList = [
      {
        id: 1,
        name: 'Allianz',
        price: '100',
        wkn: '123456',
        quantity: 100,
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '01.11.2023',
        totalPrice: 1
      },
      {
        id: 2,
        name: 'Allianz',
        price: '200',
        wkn: '123456',
        quantity: 200,
        description: 'Versicherungsgesellschaft',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
        totalPrice: 1
      },
      {
        id: 3,
        name: 'BASF',
        price: '50',
        wkn: '987654',
        quantity: 50,
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
        totalPrice: 1
      },
      {
        id: 4,
        name: 'BASF',
        price: '40',
        wkn: '987654',
        quantity: 100,
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '02.11.2023',
        totalPrice: 1
      },
      {
        id: 5,
        name: 'BASF',
        price: '30',
        wkn: '987654',
        quantity: 200,
        description: 'Chemie Unternehmen',
        category: 'Aktie',
        purchaseDate: '03.11.2023',
        totalPrice: 1
      },
      {
        id: 6,
        name: 'Bitcoin',
        price: '32000',
        wkn: 'BTC',
        quantity: 1,
        description: 'Kryptowährung',
        category: 'Crypto',
        purchaseDate: '03.11.2023',
        totalPrice: 1
      },
    ]; 
    
    // calculate average price and total price for each WKN
const portfolioMap = new Map<string, Portfolio[]>();
for (const portfolio of this.portfolioList) {
  const portfolioGroup = portfolioMap.get(portfolio.wkn);
  if (portfolioGroup) {
    portfolioGroup.push(portfolio);
  } else {
    portfolioMap.set(portfolio.wkn, [portfolio]);
  }
}

for (const [wkn, portfolios] of portfolioMap) {
  const totalPrice = portfolios.reduce((acc, portfolio) => acc + parseFloat(portfolio.price) * portfolio.quantity, 0);
  const roundedTotalPrice = parseFloat(totalPrice.toFixed(2));
  const totalQuantity = portfolios.reduce((acc, portfolio) => acc + Number(portfolio.quantity), 0);
  const averagePrice = totalPrice / totalQuantity;

  for (const portfolio of portfolios) {
    portfolio.price = averagePrice.toFixed(2);
    portfolio.totalPrice = roundedTotalPrice;
  }
}


  }
}
