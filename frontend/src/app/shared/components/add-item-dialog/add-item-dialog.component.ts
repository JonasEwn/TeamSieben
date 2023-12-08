import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {PortfolioItems} from "../../models/portfolioItems";
import {PortfolioCompanies} from "../../models/portfolioCompanies";
import {PortfolioItemsService} from "../../services/http/portfolioItems.service";
import {PortfolioCompaniesService} from "../../services/http/portfolioCompanies.service";
import {Router} from "@angular/router";
import {OverviewComponent} from "../../../views/overview/overview.component";


// This component is used to add a new item to the list.
// It is used in the overview.component.html.
// It is a standalone component.

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {

  itemData: PortfolioItems[] = [];
  companyData: PortfolioCompanies[] = [];
  currentDate = new Date();


  @Output() formSubmit = new EventEmitter;
  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private itemService: PortfolioItemsService,
              private comapaniesService: PortfolioCompaniesService,
              private router: Router) {
    this.myForm = this.fb.group({
      wkn: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.myForm.value);
    const formData = this.myForm.value;
    this.itemData = [{
      wkn: formData.wkn,
      purchasePrice: formData.price,
      quantity: formData.quantity,
      purchaseDate: this.currentDate,
    }];
    console.log(this.itemData);

    this.companyData = [{
      wkn: formData.wkn,
      name: formData.name,
      description: formData.description,
      category: formData.category,
    }];
    console.log(this.companyData);

    this.comapaniesService.sendData(this.companyData).subscribe();
    this.itemService.sendData(this.itemData).subscribe();

    this.router.navigate([OverviewComponent]);
    window.location.reload();
  }
}
