import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PortfolioItems} from "../../models/portfolioItems";
import {PortfolioItemsService} from "../../services/http/portfolioItems.service";

@Component({
  selector: 'app-buy-item-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './buy-item-dialog.component.html',
  styleUrl: './buy-item-dialog.component.scss'
})
export class BuyItemDialogComponent implements OnInit{

  myForm: FormGroup;
  itemData: object = [];
  currentDate = new Date();

  // @Inject holt sich Variable die von einer anderen Komponente mitgegeben wird
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private httpClient: HttpClient,
              private itemService: PortfolioItemsService) {
    console.log(data)
    this.myForm = this.fb.group({
      wkn: [{value: this.data.wkn, disabled: true}],
      name: [{value: '' , disabled: true}],
      description: [{value: '', disabled: true}],
      category: [{value: '', disabled: true}],
      price: [{value: null, disabled:true}],
      quantity: ['', Validators.required]
    });

    console.log('Wkn wird übergeben: ', this.data.wkn);
  }

  // Wenn Item kaufen (Plus Knopf) gedrückt wird werden Company Daten von WKN abgefragt
  ngOnInit() {

    this.httpClient.get<any>(`http://localhost:8080/companies/company/${this.data.wkn}`).subscribe(
      data => {
        this.myForm?.patchValue({
          name: data.name,
          description: data.description,
          category: data.category,
        })
      });
    this.httpClient.get<any>(`http://localhost:8080/companies/swagger/${this.data.wkn}`, {observe: "body"}).subscribe(
      data => {
        this.myForm?.patchValue({
          price: data.price
        })
      }
    )

  }

  onSubmit() {
    console.log(this.myForm.value);
    const formData = this.myForm.value;

    this.itemData = {
      wkn: this.data.wkn,
      purchasePrice: this.myForm.get('price')?.value,
      quantity: formData.quantity,
      purchaseDate: this.currentDate,
    };
    console.log(this.itemData)
    this.httpClient.post('http://localhost:8080/portfolio', this.itemData).subscribe()
    window.location.reload();
  }

  calculateTotal(){
    return this.myForm.get('quantity')?.value * this.myForm.get('price')?.value
  }
}
