import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesRoutingModule } from './recipes-routing-module';
import { RecipeList } from './pages/recipe-list/recipe-list';
import { RecipeForm } from './pages/recipe-form/recipe-form';

@NgModule({
  declarations: [
    RecipeList,
    RecipeForm
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule {}
