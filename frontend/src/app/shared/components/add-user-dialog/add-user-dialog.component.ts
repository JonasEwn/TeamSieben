import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {OverviewComponent} from "../../../views/overview/overview.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {

  myForm: FormGroup;
  userData: any[] = [];
  data: any;
  postError: String | null = null;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) {

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    const formData = this.myForm.value;
    this.userData = [{
      name: formData.name,
      username: formData.username,
      password: formData.password
    }];
    this.data = Object.assign({},...this.userData);
    console.log(this.data);
    this.http.post('http://localhost:8080/users', this.data).subscribe(
      next =>{
        this.router.navigate([OverviewComponent]);
        window.location.reload();
        this.postError = null;
      },
      error => {
        this.postError = error.message || "Benutzername existiert bereits";
      }
    );
  }

  // Checkt ob username Feld Fehler hatt
  // control.dirty gibt an ob Form-Feld eintrag hat (true wenn ja)
  // Wenn alles True gibt es true zurück wenn ein Fehler gibt, dann False
  hasError(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return !!((control && (control.dirty || control.touched) && control.invalid) || this.postError);
  }
}
