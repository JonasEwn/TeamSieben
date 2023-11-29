
import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { PortfolioItems } from 'src/app/shared/models/portfolioItems';
import { PortfolioItemsService } from 'src/app/shared/services/http/portfolioItems.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {}
