import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-buy-item-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-item-dialog.component.html',
  styleUrl: './buy-item-dialog.component.scss'
})
export class BuyItemDialogComponent {

}
