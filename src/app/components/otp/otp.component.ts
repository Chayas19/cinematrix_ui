import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent  implements OnInit{

  otpVerify!:FormGroup;;
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {

  this.otpVerify = this.fb.group({
    otp : []
  })    

    
  }

  onRequestOTP(){

  }

}
