import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseDetailList } from './pages/purchase-detail-list/purchase-detail-list';
import { PurchaseDetailForm } from './pages/purchase-detail-form/purchase-detail-form';

const routes: Routes = [
  { path: '', component: PurchaseDetailList },
  { path: 'new', component: PurchaseDetailForm },
  { path: 'edit/:id', component: PurchaseDetailForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseDetailsRoutingModule {}
