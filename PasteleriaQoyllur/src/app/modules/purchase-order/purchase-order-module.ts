import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrdersRoutingModule } from './purchase-order-routing-module';
import { PurchaseOrderList } from './pages/purchase-order-list/purchase-order-list';
import { PurchaseOrderForm } from './pages/purchase-order-form/purchase-order-form';


@NgModule({
  declarations: [
    PurchaseOrderList,
    PurchaseOrderForm
  ],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    ReactiveFormsModule
  ]
})
export class PurchaseOrderModule { }
