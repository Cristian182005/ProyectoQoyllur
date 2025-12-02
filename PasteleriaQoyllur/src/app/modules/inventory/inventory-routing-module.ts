import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryList } from './pages/inventory-list/inventory-list';
import { InventoryForm } from './pages/inventory-form/inventory-form';

const routes: Routes = [
  { path: '', component: InventoryList },
  { path: 'new', component: InventoryForm },
  { path: 'edit/:id', component: InventoryForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
