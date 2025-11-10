import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { OrderList } from './pages/order-list/order-list';
import { OrderForm } from './pages/order-form/order-form';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderList,
    OrderForm
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
