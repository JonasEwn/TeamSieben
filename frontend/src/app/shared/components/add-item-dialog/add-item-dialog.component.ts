import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormGroup,FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PortfolioItemsService } from '../../services/http/portfolioItems.service';
import { PortfolioItems } from '../../models/portfolioItems';
import { PortfolioCompanies } from '../../models/portfolioCompanies';
import { PortfolioCompaniesService } from '../../services/http/portfolioCompanies.service';
import { AllCompanies } from '../../models/allCompanies';
import { AllCompaniesService } from '../../services/http/allCompanies.service';



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
  
  public myForm: FormGroup
  constructor(
    private fb: FormBuilder, ) {
      this.myForm = this.fb.group({
        newItem: this.fb.array([])

      }),
      this.initForm();
    
    }
    initForm():void {
      this.myForm = this.fb.group ({
        wkn: ['',Validators.required],
        name:  ['',Validators.required],
        description:  ['',Validators.required],
        quantity:  ['',Validators.required],
        price:  ['',Validators.required],
        category:  ['',Validators.required],

      })
    }
    onSubmit(){
      console.warn(this.myForm.value);
      
  }
    }

