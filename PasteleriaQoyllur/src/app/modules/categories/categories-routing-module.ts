import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryList } from './pages/category-list/category-list';
import { CategoryForm } from './pages/category-form/category-form';

const routes: Routes = [
  { path: '', component: CategoryList },
  { path: 'new', component: CategoryForm },
  { path: 'edit/:id', component: CategoryForm }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
