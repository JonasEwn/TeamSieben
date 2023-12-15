import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UserComponent} from "../../../views/components/user/user.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  myForm: FormGroup;
  postError: String | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private http: HttpClient,
              private router: Router) {
    this.myForm = this.fb.group({
      name: [''],
      password: [''],
    });
  }

  onSubmit(){
    console.log(this.data.username)
    this.http.put(`http://localhost:8080/users/${this.data.username}`, this.myForm.value).subscribe(
      success => {
        this.router.navigate([UserComponent]);
        window.location.reload();
        this.postError = null;
      },
      error => {
        this.postError = error.message || "Benutzername existiert bereits";
      }
    );
  }

  hasError(controlName: string): boolean {
    const control = this.myForm.get(controlName);
    return !!((control && (control.dirty || control.touched) && control.invalid) || this.postError);
  }
}
