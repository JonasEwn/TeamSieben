import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {Details} from "../../../shared/models/details";
import {GeneralInfo} from "../../../shared/models/generalInfo";
import {ActivatedRoute} from "@angular/router";
import {DetailsService} from "../../../shared/services/http/details.service";
import {GeneralInfoService} from "../../../shared/services/http/generalInfo.service";
import {HttpClient} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatButtonModule, MatToolbarModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{

  users: any[] = [];
  displayedColumns: String[] = ['name', 'username', 'password'];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<any>(`http://localhost:8080/users`).subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }
    );
  }
}
