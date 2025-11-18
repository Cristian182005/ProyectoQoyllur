import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientsRoutingModule } from './ingredients-routing-module';
import { IngredientList } from './pages/ingredient-list/ingredient-list';
import { IngredientForm } from './pages/ingredient-form/ingredient-form';

@NgModule({
  declarations: [
    IngredientList,
    IngredientForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IngredientsRoutingModule
  ]
})
export class IngredientsModule {}
