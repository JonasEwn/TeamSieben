
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../../shared/services/http/details.service";
import {Details} from "../../shared/models/details";
import {GeneralInfo} from "../../shared/models/generalInfo";
import {GeneralInfoService} from "../../shared/services/http/generalInfo.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  items: Details[] = [];
  displayedColumns: String[] = ['purchaseDate', 'quantity', 'purchasePrice', 'totalPrice'];

  generalInfos: GeneralInfo[] = [];

  constructor(private route: ActivatedRoute,
              private detailsService: DetailsService,
              private generalInfoService: GeneralInfoService) {
  }

  ngOnInit() {
    const wkn = this.route.snapshot.paramMap.get('wkn');
    console.log("Detail von WKN:", wkn);

    this.detailsService.getData(wkn).subscribe(data => {
      this.items = data
    });

    this.generalInfoService.getData(wkn).subscribe(infoData => {
        this.generalInfos = infoData
    });
  }
}
