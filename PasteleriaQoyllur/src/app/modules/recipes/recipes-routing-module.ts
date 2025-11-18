import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeList } from './pages/recipe-list/recipe-list';
import { RecipeForm } from './pages/recipe-form/recipe-form';

const routes: Routes = [
  { path: '', component: RecipeList },
  { path: 'new', component: RecipeForm },
  { path: 'edit/:id', component: RecipeForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
