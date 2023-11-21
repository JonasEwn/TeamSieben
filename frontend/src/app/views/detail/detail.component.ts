import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Portfolio } from 'src/app/shared/models/portfolio';
import { PortfolioService } from 'src/app/shared/services/http/portfolio.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public myId: string = "";

  constructor(
      private portfolioService: PortfolioService,   // Injiziert den PortfolioService
      private route: ActivatedRoute
    ) {
    this.route.params.subscribe( params => this.myId = params['id']);
  }
}