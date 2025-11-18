import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UnitsRoutingModule } from './units-routing-module';
import { UnitList } from './pages/unit-list/unit-list';
import { UnitForm } from './pages/unit-form/unit-form';

@NgModule({
  declarations: [
    UnitList,
    UnitForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnitsRoutingModule
  ]
})
export class UnitsModule {}
