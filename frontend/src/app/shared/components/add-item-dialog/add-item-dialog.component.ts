import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {Portfolio} from "../../models/portfolio";
import {PortfolioService} from "../../services/http/portfolio.service";
import {Router} from "@angular/router";
import { PortfolioCategories } from '../../models/portfolioCategories';



// This component is used to add a new item to the list.
// It is used in the overview.component.html.
// It is a standalone component.

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {
  public myForm: FormGroup;

  constructor(private fb: FormBuilder, private portfolioService: PortfolioService, private router: Router) {
    this.myForm = this.fb.group({
      newItem: this.fb.array([])
    });
    this.initForm();
  }

  initForm(): void{
    this.myForm = this.fb.group({
      wkn: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(){
    console.warn(this.myForm.value);
    let p: Portfolio = {
      id: this.portfolioService.getNextId(),
      wkn: this.myForm.value.wkn,
      name: this.myForm.value.name,
      price: this.myForm.value.price,
      quantity: this.myForm.value.quantity,
      description: this.myForm.value.description,
      category: this.myForm.value.category,
      purchaseDate: "23.11.2023", 
      totalPrice: 0, 
      averagePrice: 0, 
      totalQuantity: 0, 
      rowPrice: 0
    };
    console.warn(p);
    this.portfolioService.addItem(p);

    let c: PortfolioCategories = {
      wkn: this.myForm.value.wkn,
      name: this.myForm.value.name,
      description: this.myForm.value.description,
      category: this.myForm.value.category,
      totalPrice: 0, 
      averagePrice: 0, 
      totalQuantity: 0, 
    };
    this.portfolioService.addCategoryItem(c);
    this.portfolioService.generatePortfolioList;
    //this.portfolioService.addItem(this.newItem);
    //this.router.navigate(['/overview']);
  }

}
