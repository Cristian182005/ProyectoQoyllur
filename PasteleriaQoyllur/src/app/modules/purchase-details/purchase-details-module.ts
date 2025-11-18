import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseDetailsRoutingModule } from './purchase-details-routing-module';
import { PurchaseDetailForm } from './pages/purchase-detail-form/purchase-detail-form';
import { PurchaseDetailList } from './pages/purchase-detail-list/purchase-detail-list';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PurchaseDetailForm,
    PurchaseDetailList
  ],
  imports: [
    CommonModule,
    PurchaseDetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class PurchaseDetailsModule { }
