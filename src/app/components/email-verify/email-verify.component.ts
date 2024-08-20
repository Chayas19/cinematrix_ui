import { HttpClient } from '@angular/common/http';
import { compileDeclareClassMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  storeEmail : any = '';

  emailVerify!: FormGroup;
  otpVerify!:FormGroup;
  constructor( private fb:FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ){}

  ngOnInit(): void {

    this.emailVerify = this.fb.group({
      email : ['', Validators.required]
    })
    
    this.otpVerify = this.fb.group({
      code : ['', Validators.required],
    })
  }
  onSubmit() {
    if (this.emailVerify.valid) {
      this.storeEmail = this.emailVerify.value
      const { email } = this.emailVerify.value;
      
      this.http.post('https://localhost:7133/api/UserAccount/send-email-otp', 
        { email },
        { responseType: 'text' } // Expecting text response
      ).subscribe(
        (response: string) => {
          try {
            this.toastr.success(response );
          } catch (e) {
            this.toastr.success(response );
          }
          // this.router.navigate(['/']);
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

  otp() {
    console.log(this.otpVerify.value)
    if (this.otpVerify.valid) {
      const { email} = this.storeEmail;
      const { code } = this.otpVerify.value;
    
      this.http.post('https://localhost:7133/api/UserAccount/verify-email', 
        { email,code },
        { responseType: 'text' } // Expecting text response
      ).subscribe(
        (response: string) => {
          try {
            this.toastr.success(response );
          } catch (e) {
            this.toastr.success(response );
          }
          this.router.navigate(['/login']);
        },
        (error) => {
          let errorMessage = 'Invalid OTP.';
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
