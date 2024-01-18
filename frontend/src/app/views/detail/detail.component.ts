
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../../shared/services/http/details.service";
import {Details} from "../../shared/models/details";
import {GeneralInfo} from "../../shared/models/generalInfo";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  items: Details[] = [];
  displayedColumns: String[] = ['purchaseDate', 'quantity', 'purchasePrice', 'totalPrice'];

  generalInfos: GeneralInfo[] = [];
  generalInfoTest: any = [];

  constructor(private route: ActivatedRoute,
              private detailsService: DetailsService,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    const wkn = this.route.snapshot.paramMap.get('wkn');
    console.log("Detail von WKN:", wkn, " Preis:", wkn);

    this.httpClient.get(`http://localhost:8080/portfolio/details/${wkn}`).subscribe(data => {
      this.generalInfoTest = data
    });

    this.detailsService.getData(wkn).subscribe(data => {
      this.items = data
    });

  }

}
