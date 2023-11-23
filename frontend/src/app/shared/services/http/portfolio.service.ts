import { Injectable } from '@angular/core';
import { Portfolio, portfolio } from '../../models/portfolio';
import { Observable } from 'rxjs';

// Deklariert den PortfolioService als Injectable-Service
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  portfolioList: Portfolio[] = [];

  public getPortfolioList(): Observable<Portfolio[]> {
    this.generatePortfolioList(); // Generiert die Portfolioliste von einem MOCK
    return new Observable<Portfolio[]>((subscriber) => { // Erstellt ein neues Observable und sendet die Portfolioliste an den Abonnenten
      subscriber.next(this.portfolioList);
      subscriber.complete();
    });
  }

  public addPortfolio(): Observable<Portfolio> {
    return new Observable<Portfolio>(() => {
       //Erstellt ein neues Observable, das den Klick auf den Button "Add Portfolio" auslöst
      console.log('addPortfolio clicked');
    });
  }


  private generatePortfolioList(): void { // Erzeugt eine Beispiel-Portfolioliste mit mehreren Portfolios
    this.portfolioList = [...portfolio]; 
    
    // Gruppiert die Portfolios nach WKN und berechnet den Durchschnittspreis und den Gesamtpreis für jede WKN
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
      const totalPrice = portfolios.reduce((acc, portfolio) => acc + portfolio.price * portfolio.quantity, 0);
      const roundedTotalPrice = parseFloat(totalPrice.toFixed(0));
      const totalQuantity = portfolios.reduce((acc, portfolio) => acc + Number(portfolio.quantity), 0);
      const averagePrice = totalPrice / totalQuantity;

      for (const portfolio of portfolios) {
        const rowPrice =  portfolio.price * portfolio.quantity;
        portfolio.rowPrice = rowPrice;
        portfolio.averagePrice = parseFloat(averagePrice.toFixed(2));
        portfolio.totalPrice = roundedTotalPrice;
        portfolio.totalQuantity = totalQuantity;
      }
    }
      }
    }