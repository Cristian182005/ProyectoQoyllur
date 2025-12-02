import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing-module';
import { RolesForm } from './pages/roles-form/roles-form';
import { RolesList } from './pages/roles-list/roles-list';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RolesForm,
    RolesList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
