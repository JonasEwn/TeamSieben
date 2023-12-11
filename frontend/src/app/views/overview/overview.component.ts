import {Component, OnInit} from '@angular/core';
import {Overview} from "../../shared/models/overview";
import {OverviewService} from "../../shared/services/http/overview.service";
import {Router} from "@angular/router";
import {Dialog} from "@angular/cdk/dialog";
import {DetailComponent} from "../detail/detail.component";
import {ImpressumComponent} from "../impressum/impressum.component";
import {HomeComponent} from "../components/home/home.component";
import {AddItemDialogComponent} from "../../shared/components/add-item-dialog/add-item-dialog.component";
import {BuyItemDialogComponent} from "../../shared/components/buy-item-dialog/buy-item-dialog.component";

@Component({
  selector: 'app-overview', // Definiert den Selektor für die Komponente
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {// Deklariert eine Referenz zum MatPaginator und MatSort

  all: Overview[] = [];
  displayedColumns: string[] = ['wkn', 'name', 'quantity','average', 'total', 'buy'];
  constructor(private allCompaniesService: OverviewService,
              private router: Router,
              public dialog: Dialog) {
  }

  ngOnInit(): void {
    this.allCompaniesService.getData().subscribe(data =>{
      this.all = data
    });
  }

  details(wkn: string){
    console.log(wkn)

    this.router.navigate(['overview/detail', wkn]);
  }

  openDialog(){
    console.log("Button clicked");
    const dialogRef = this.dialog.open(AddItemDialogComponent);

  }

  buyItem(wkn: string, event: Event){
    event.stopPropagation();
    console.log("Buy item of this wkn: ", wkn);
    this.dialog.open(BuyItemDialogComponent);
  }
}
