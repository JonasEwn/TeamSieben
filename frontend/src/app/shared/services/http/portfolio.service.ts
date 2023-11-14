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
    for (let i = 1; i <= 100; i++) {
      const newItem: Portfolio = {
        id: `ID${i}`,
        name: `Portfolio ${i}`,
        price: `$${(Math.random() * 1000).toFixed(2)}`,
        wkn: `WKN- ${Math.floor(Math.random() * 1000000)}`,
      };

      this.portfolioList.push(newItem);
    }
  }
}
