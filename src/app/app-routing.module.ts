import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component:RegisterComponent},
  { path: 'home', component: HomeComponent },
  {
    path: "register", component: RegisterComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "reset-password", component: ResetPasswordComponent
  },
  {
    path: "forget-password", component: ForgotPasswordComponent
  },
  {
    path: "email-verify", component: EmailVerifyComponent
  },
  {
    path: "forgot-password", component: ForgotPasswordComponent
  },
  {
    path: "reset-password", component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
