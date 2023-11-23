import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { AddItemDialogComponent } from 'src/app/shared/components/add-item-dialog/add-item-dialog.component';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-overview', // Definiert den Selektor für die Komponente
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {// Deklariert eine Referenz zum MatPaginator und MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wkn', 'name', 'purchaseDate', 'quantity', 'averagePrice', 'totalPrice', 'action'];// Definiert die Spalten, die in der Tabelle angezeigt werden sollen


  resultsLength = 0;          // Speichert die Anzahl der Ergebnisse
  isLoadingResults = true;
  isRateLimitReached = false; // Speichert, ob das Rate-Limit erreicht wurde

  public portfolioList: Portfolio[] = [];         // Speichert die Liste der Portfolios
  private toDestroy$: Subject<void> = new Subject<void>();    // Speichert ein Subject für die Ereignisbehandlung

  constructor(
    private portfolioService: PortfolioService,   // Injiziert den PortfolioService
    private dialog: MatDialog,   // Injiziert den MatDialog
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {      // Lifecycle-Hook-Methode ngOnInit wird beim Initialisieren der Komponente aufgerufen
    this.portfolioService
      .getPortfolioList()
      .subscribe((response: Portfolio[]) => {
        this.portfolioList = response;
      });
  }

  ngOnDestroy(): void {     // Lifecycle-Hook-Methode ngOnDestroy wird beim Zerstören der Komponente aufgerufen
    this.toDestroy$.next(); // Sendet ein Ereignis aus, um das Subjekt zu beenden
    this.toDestroy$.complete();
  }

  public add(): void {    // Methode zum Hinzufügen eines neuen Portfolios
    this.portfolioService.addPortfolio().subscribe((response: Portfolio) => {
      this.portfolioList.push(response);
    });
  }

  openDialog(): void {    // Methode zum Öffnen des Dialogfensters zum Hinzufügen von Elementen
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    //dialogRef.afterClosed().subscribe((result) => {
      // Handle dialog close event if needed
      //console.log(Dialog result: ${result});
  }

  showDetails(row: any): void {
    this.router.navigate([row.wkn + '/detail'], {relativeTo: this.route})
  }

}
