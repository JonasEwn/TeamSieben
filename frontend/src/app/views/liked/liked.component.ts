import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BuyItemDialogComponent} from "../../shared/components/buy-item-dialog/buy-item-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss'
})
export class LikedComponent implements OnInit{

  all: any = [];
  displayedColumns: string[] = ['wkn', 'name', 'quantity','profitloss', 'total', 'buy'];
  constructor(private httpClient: HttpClient,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.httpClient.get(`http://localhost:8080/likes/likedcompanies/${sessionStorage.getItem("username")}`).subscribe(
      companyData => {
        this.all = companyData
      });
  }

  details(wkn: string){
    this.router.navigate(['overview/detail', wkn]);
  }

  buyItem(wkn: string, event: Event){
    event.stopPropagation();
    this.dialog.open(BuyItemDialogComponent, {data: {wkn: wkn}});
  }
}
