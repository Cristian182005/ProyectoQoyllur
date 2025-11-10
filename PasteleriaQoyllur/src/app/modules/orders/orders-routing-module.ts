import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderList } from './pages/order-list/order-list';
import { OrderForm } from './pages/order-form/order-form';

const routes: Routes = [
  { path: '', component: OrderList },               // /orders
  { path: 'new', component: OrderForm },            // /orders/new
  { path: 'edit/:id', component: OrderForm }        // /orders/edit/1
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
