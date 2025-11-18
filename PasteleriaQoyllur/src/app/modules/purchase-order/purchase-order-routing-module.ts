import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseOrderList } from './pages/purchase-order-list/purchase-order-list';
import { PurchaseOrderForm } from './pages/purchase-order-form/purchase-order-form';

const routes: Routes = [
  { path: '', component: PurchaseOrderList },
  { path: 'new', component: PurchaseOrderForm },
  { path: 'edit/:id', component: PurchaseOrderForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrdersRoutingModule {}
