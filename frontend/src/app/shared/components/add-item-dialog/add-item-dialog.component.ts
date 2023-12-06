import {Component, EventEmitter, numberAttribute, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {PortfolioItems} from "../../models/portfolioItems";
import {PortfolioCompanies} from "../../models/portfolioCompanies";
import {PortfolioItemsService} from "../../services/http/portfolioItems.service";
import {PortfolioCompaniesService} from "../../services/http/portfolioCompanies.service";


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
  currentDate = new Date().toISOString().substr(0, 10);


  @Output() formSubmit = new EventEmitter;
  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private itemService: PortfolioItemsService,
              private comapaniesService: PortfolioCompaniesService) {
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
      purchaseDate: this.currentDate,
      purchasePrice: formData.price,
      quantity: formData.quantity,
      wkn: formData.wkn
    }];
    console.log(this.itemData);

    this.companyData = [{
      wkn: formData.wkn,
      name: formData.name,
      description: formData.description,
      category: formData.category,
    }];
    console.log(this.companyData);

    this.comapaniesService.sendData(this.companyData);
    this.itemService.sendData(this.itemData);
  }

  protected readonly numberAttribute = numberAttribute;
}
