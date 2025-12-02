import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing-module';
import { InventoryForm } from './pages/inventory-form/inventory-form';
import { InventoryList } from './pages/inventory-list/inventory-list';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryForm,
    InventoryList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
