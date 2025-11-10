import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing-module';
import { CustomerList } from './pages/customer-list/customer-list';
import { CustomerForm } from './pages/customer-form/customer-form';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerList,
    CustomerForm
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule { }
