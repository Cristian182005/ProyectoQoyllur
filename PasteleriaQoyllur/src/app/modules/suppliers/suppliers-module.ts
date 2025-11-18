import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SuppliersRoutingModule } from './suppliers-routing-module';
import { SupplierList } from './pages/supplier-list/supplier-list';
import { SupplierForm } from './pages/supplier-form/supplier-form';

@NgModule({
  declarations: [
    SupplierList,
    SupplierForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule {}
