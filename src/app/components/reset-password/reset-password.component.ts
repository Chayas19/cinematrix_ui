import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

   resetForm!: FormGroup;
  constructor(private formbuilder : FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
  ){}
   ngOnInit(): void {
    
     this.resetForm = this.formbuilder.group(
      {
        newPassword : ['',Validators.required],
        confirmPassword: ['',Validators.required] 
      },
     )

   }

   onSubmit() {
    if (this.resetForm.valid) {
      const { newPassword, confirmPassword} = this.resetForm.value;
      
      this.http.post('', 
        { newPassword,confirmPassword},
        { responseType: 'text' } // Expecting text response
      ).subscribe(
        (response: string) => {
          // this.isLoading = false; 
        
          try {
            this.toastr.success(response || 'Password reset successfully. You can now log in with your new password');
          } catch (e) {
            this.toastr.success(response || 'Password reset successfully. You can now log in with your new password');
          }
          this.router.navigate(['/login']);
        },
        (error) => {
          // this.isLoading = false; 
         
          let errorMessage = 'Password reset failed. Please try again.';
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
