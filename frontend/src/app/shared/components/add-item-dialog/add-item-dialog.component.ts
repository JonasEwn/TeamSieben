import {Component, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {Router} from "@angular/router";
import {OverviewComponent} from "../../../views/overview/overview.component";
import {HttpClient} from "@angular/common/http";
import {CdkTableModule} from "@angular/cdk/table";


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
    CdkTableModule,
  ],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.scss',
})
export class AddItemDialogComponent {

  currentDate = new Date();
  isinError = false;
  wknDuplicate = false;
  showCompanyInfo = false;


  @Output() formSubmit = new EventEmitter;
  myForm: FormGroup;

  mySecondForm: FormGroup;

  constructor(private fb: FormBuilder,
              private httpClient: HttpClient,
              private router: Router) {
    this.myForm = this.fb.group({
      isin: ['', Validators.required],
    });

    this.mySecondForm = this.fb.group({
      wkn: [{value: '', disabled: true}],
      description: [{value: '', disabled: true}],
      name: [{value: '', disabled: true}],
      category: [{value: '', disabled: true}],
      price: [{value: '', disabled: true}],
      quantity: ['', Validators.required],
      //total: [{value: '', disabled: true}]
    })
  }

  checkIsin(){
    const isin = this.myForm.get('isin')?.value;
    console.log("Checking ISIN: ", isin);
    this.httpClient.get<any>(`http://localhost:8080/companies/swagger/${isin}`, {observe: 'response'}).subscribe({
      complete: () => {
        this.checkWknDuplicate(isin)
      },
      error: () => {
        this.isinError = true;
        console.error("ISIN was not found or does not exist!")
      },
      next: (data) => {
        console.log(data.body)
        this.mySecondForm.setValue({
          wkn: data.body.isin,
          description: data.body.description,
          name: data.body.name,
          category: data.body.type,
          price: data.body.price,
          quantity: null
        })
      }
    });
  }


  // Teilt Daten in Company und Item (kauf) auf und sendet beide Anfragen nacheinander
  onSubmit(){

    const itemData = {
      wkn: this.mySecondForm.get('wkn')?.value,
      purchasePrice: this.mySecondForm.get('price')?.value,
      quantity: this.mySecondForm.get('quantity')?.value,
      purchaseDate: this.currentDate,
    };
    console.log(itemData);

    let companyData = {
      wkn: this.mySecondForm.get('wkn')?.value,
      name: this.mySecondForm.get('name')?.value,
      description: this.mySecondForm.get('description')?.value,
      category: this.mySecondForm.get('category')?.value
    };
    console.log(companyData);

    this.httpClient.post('http://localhost:8080/companies', companyData).subscribe({
      complete:() => {
        this.httpClient.post('http://localhost:8080/portfolio', itemData).subscribe({
          complete: () => {
            this.router.navigate([OverviewComponent]);
            window.location.reload();
          },
          error: err => {
            console.error("Buying item did not work! \n Grund: ", err)
          }
        })
      },
      error: err => {
        console.error("Creat Company did not work! \n Grund: ", err)
      }
    });
  }

  checkWknDuplicate(isin: String) {
    this.httpClient.get<boolean>(`http://localhost:8080/companies/duplicate/${isin}`).subscribe({
      next: duplicate => {
        this.wknDuplicate = duplicate
        console.log("Duplicate? ", duplicate)

        this.isinError = false;

        console.log("%c Status okay", 'color: #19bf13')
        if (!duplicate) {
          this.showCompanyInfo = true
        }
      }
    });
  }

  calculateTotal(){
    return this.mySecondForm.get('quantity')?.value * this.mySecondForm.get('price')?.value
  }
}
