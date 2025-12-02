import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesList } from './pages/roles-list/roles-list';
import { RolesForm } from './pages/roles-form/roles-form';

const routes: Routes = [
  { path: '', component: RolesList },
  { path: 'new', component: RolesForm },
  { path: 'edit/:id', component: RolesForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
