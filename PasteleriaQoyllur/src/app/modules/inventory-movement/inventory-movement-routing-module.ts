import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryMovementList } from './pages/inventory-movement-list/inventory-movement-list';
import { InventoryMovementForm } from './pages/inventory-movement-form/inventory-movement-form';

const routes: Routes = [
  { path: '', component: InventoryMovementList },
  { path: 'new', component: InventoryMovementForm },
  { path: 'edit/:id', component: InventoryMovementForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryMovementsRoutingModule {}
