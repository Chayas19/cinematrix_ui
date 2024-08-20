import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ){};

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      const { email,password } = this.loginForm.value;

      this.http.post('https://localhost:7133/api/UserAccount/login', 
        { email,password },
        { responseType: 'text' } // Expecting text response
      ).subscribe(
        (response: string) => {
          try {
            this.toastr.success(response );
          } catch (e) {
            this.toastr.success(response );
          }
          this.router.navigate(['/home']);
        },
        (error) => {
          let errorMessage = 'Invalid Email-Id.';
          if (error.error) {
            try {
              errorMessage = JSON.parse(error.error).message || errorMessage;
            } catch (e) {
              errorMessage = error.error || errorMessage;
            }
          }
          this.toastr.error(errorMessage);
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.');
    }
  }

}
