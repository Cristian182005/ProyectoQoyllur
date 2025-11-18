import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientList } from './pages/ingredient-list/ingredient-list';
import { IngredientForm } from './pages/ingredient-form/ingredient-form';

const routes: Routes = [
  { path: '', component: IngredientList },
  { path: 'new', component: IngredientForm },
  { path: 'edit/:id', component: IngredientForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngredientsRoutingModule {}
