import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './pages/login/login';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { Register } from './pages/register/register';


@NgModule({
  declarations: [
    Login,
    Register
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
