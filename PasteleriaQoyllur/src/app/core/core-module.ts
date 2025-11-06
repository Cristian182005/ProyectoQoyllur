import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { SharedModule } from '../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Footer,
    Header
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
