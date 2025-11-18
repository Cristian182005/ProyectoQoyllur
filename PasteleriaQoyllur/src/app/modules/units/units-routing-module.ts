import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitList } from './pages/unit-list/unit-list';
import { UnitForm } from './pages/unit-form/unit-form';

const routes: Routes = [
  { path: '', component: UnitList },
  { path: 'new', component: UnitForm },
  { path: 'edit/:id', component: UnitForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule {}
