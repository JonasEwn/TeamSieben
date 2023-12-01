
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { PortfolioItems } from 'src/app/shared/models/portfolioItems';
import { PortfolioItemsService } from 'src/app/shared/services/http/portfolioItems.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  items: PortfolioItems[] = [];
  displayedColumns: String[] = ['wkn', 'id', 'purchaseDate', 'quantity', 'purchasePrice'];
  constructor(private route: ActivatedRoute,
              private portfolioItemsService: PortfolioItemsService) {
  }

  ngOnInit() {

    this.portfolioItemsService.getData().subscribe(data => {
      this.items = data
    });

    const wkn = this.route.snapshot.paramMap.get('wkn');
    console.log("Detail von WKN:", wkn);
  }
}
