import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryMovementsRoutingModule } from './inventory-movement-routing-module';
import { InventoryMovementForm } from './pages/inventory-movement-form/inventory-movement-form';
import { InventoryMovementList } from './pages/inventory-movement-list/inventory-movement-list';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventoryMovementForm,
    InventoryMovementList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InventoryMovementsRoutingModule
  ]
})
export class InventoryMovementModule { }
