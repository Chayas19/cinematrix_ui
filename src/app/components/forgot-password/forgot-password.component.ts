import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
    
  forgotPasswordform!: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private http: HttpClient,
     private toastr: ToastrService,
     private router: Router,

  ) { }

  ngOnInit(): void {
    this.forgotPasswordform = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]]
    });
  }


  onSubmit() {
    if (this.forgotPasswordform.valid) {
      const {Email} = this.forgotPasswordform.value;
      
      this.http.post('https://localhost:7133/api/UserAccount/forgot-password', 
        {Email},
        { responseType: 'text' }
      ).subscribe(
        (response: string) => {

          try {
            this.toastr.success(response || 'Password reset link sent successfully');
          } catch (e) {
            this.toastr.success(response || 'An error occurred. Please try again later');
          }
          this.router.navigate(['/reset-password']);
        },
        (error) => {

          let errorMessage = '';
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
