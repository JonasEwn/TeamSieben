import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { AddItemDialogComponent } from 'src/app/shared/components/add-item-dialog/add-item-dialog.component';
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['name', 'price', 'wkn', 'action'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  public portfolioList: Portfolio[] = [];
  private toDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private portfolioService: PortfolioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.portfolioService
      .getPortfolioList()
      .subscribe((response: Portfolio[]) => {
        this.portfolioList = response;
      });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

  public add(): void {
    this.portfolioService.addPortfolio().subscribe((response: Portfolio) => {
      this.portfolioList.push(response);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // Handle dialog close event if needed
      console.log(`Dialog result: ${result}`);
    });
  }
}
