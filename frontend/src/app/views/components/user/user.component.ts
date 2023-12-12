import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {HttpClient} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {AddItemDialogComponent} from "../../../shared/components/add-item-dialog/add-item-dialog.component";
import {AddUserDialogComponent} from "../../../shared/components/add-user-dialog/add-user-dialog.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule, MatButtonModule, MatToolbarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  users: any[] = [];
  displayedColumns: String[] = ['name', 'username', 'password', 'delete', 'update'];

  constructor(private httpClient: HttpClient,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.httpClient.get<any>(`http://localhost:8080/users`).subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }
    );
  }


  delete(id: number){
    const isConfirmed = window.confirm('Wollen sie diesen Benutzer wirklich löschen?');
    console.log(id);
    if(isConfirmed){
      this.httpClient.delete(`http://localhost:8080/users/${id}`).subscribe();
      window.location.reload();
    }
  }

  addUser(){
    this.dialog.open(AddUserDialogComponent);
  }

  update(id: number){

  }
}
