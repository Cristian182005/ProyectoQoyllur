import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierList } from './pages/supplier-list/supplier-list';
import { SupplierForm } from './pages/supplier-form/supplier-form';

const routes: Routes = [
  { path: '', component: SupplierList },
  { path: 'new', component: SupplierForm },
  { path: 'edit/:id', component: SupplierForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule {}
