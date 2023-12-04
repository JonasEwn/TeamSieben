import {Component, OnInit} from '@angular/core';
import {Overview} from "../../shared/models/overview";
import {OverviewService} from "../../shared/services/http/overview.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview', // Definiert den Selektor für die Komponente
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {// Deklariert eine Referenz zum MatPaginator und MatSort

  all: Overview[] = [];
  displayedColumns: string[] = ['wkn', 'name', 'quantity','average', 'total'];
  constructor(private allCompaniesService: OverviewService,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("WIrd aus irgendeinem Grund aktoviert")
    this.allCompaniesService.getData().subscribe(data =>{
      this.all = data
    });
  }

  details(wkn: string){
    console.log(wkn)

    this.router.navigate(['overview/detail', wkn]);
  }
}
