import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading = false; 
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    
   //private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // this.spinner.show();

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword,phoneNumber } = this.registerForm.value;
      
      this.http.post('https://localhost:7133/api/UserAccount/register', 
        { name, email, password, confirmPassword,phoneNumber },
        { responseType: 'text' } // Expecting text response
      ).subscribe(
        (response: string) => {
          // this.isLoading = false; 
        
          try {
            this.toastr.success(response || 'User account is created successfully, please verify your email!');
          } catch (e) {
            this.toastr.success(response || 'User account is created successfully, please verify your email!');
          }
          this.router.navigate(['/email-verify']);
        },
        (error) => {
          // this.isLoading = false; 
         
          let errorMessage = 'Registration Unsuccessful. Please try again.';
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
