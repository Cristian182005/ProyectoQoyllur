import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryForm } from './pages/category-form/category-form';
import { CategoryList } from './pages/category-list/category-list';

@NgModule({
  declarations: [
    CategoryForm,
    CategoryList
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule {}
