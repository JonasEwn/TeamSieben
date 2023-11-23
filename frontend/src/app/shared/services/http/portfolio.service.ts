import { Injectable } from '@angular/core';
import { Portfolio, portfolio } from '../../models/portfolio';
import { PortfolioCategories, portfolioCategories } from '../../models/portfolioCategories';
import { Observable } from 'rxjs';

// Deklariert den PortfolioService als Injectable-Service
@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  portfolioList: Portfolio[] = [];
  portfolioCategoriesList: PortfolioCategories[] = []

  public getPortfolioList(): Observable<Portfolio[]> {
    this.generatePortfolioList(); // Generiert die Portfolioliste von einem MOCK
    return new Observable<Portfolio[]>((subscriber) => { // Erstellt ein neues Observable und sendet die Portfolioliste an den Abonnenten
      subscriber.next(this.portfolioList);
      subscriber.complete();
    });
  }
  public getPortfolioCategorieList(): Observable<PortfolioCategories[]> {
    this.generatePortfolioList(); // Generiert die Portfolioliste von einem MOCK
    return new Observable<PortfolioCategories[]>((subscriber) => { // Erstellt ein neues Observable und sendet die Portfolioliste an den Abonnenten
      subscriber.next(this.portfolioCategoriesList);
      subscriber.complete();
    });
  }

  public addPortfolio(): Observable<Portfolio> {
    return new Observable<Portfolio>(() => {
       //Erstellt ein neues Observable, das den Klick auf den Button "Add Portfolio" auslöst
      console.log('addPortfolio clicked');
    });
  }

  private generatePortfolioCategoriesList(): void { // Erzeugt eine Beispiel-Portfolioliste mit mehreren Portfolios
    this.portfolioCategoriesList = [...portfolioCategories];
  }

  public getNextId(): number {
    const maxId = Math.max(...this.portfolioList.map(item => item.id), 0); //Sucht den größten Wert der vorhanden Ids (falls keine IDs, dann 0 zurück)
    return maxId + 1; // größte gefundene ID plus 1
  }
  
  private generatePortfolioList(): void { // Erzeugt eine Beispiel-Portfolioliste mit mehreren Portfolios
    this.portfolioList = [...portfolio]; 
    this.portfolioCategoriesList = [...portfolioCategories];
    
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

        const categoryIndex = this.portfolioCategoriesList.findIndex(category => category.wkn === wkn);

        if (categoryIndex !== -1) {
          this.portfolioCategoriesList[categoryIndex].averagePrice = parseFloat(averagePrice.toFixed(2));
          this.portfolioCategoriesList[categoryIndex].totalPrice = roundedTotalPrice;
          this.portfolioCategoriesList[categoryIndex].totalQuantity = totalQuantity;
    
      }
      
    }
      }
    }
}
