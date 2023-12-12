import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-add-user',
  standalone: true,
    imports: [CommonModule, MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

}
