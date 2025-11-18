import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe-service';
import { ProductService } from '../../../products/services/product-service';
import { Product } from '../../../../shared/models/product';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Recipes } from '../../../../shared/models/recipes';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.html',
  standalone: false
})
export class RecipeList implements OnInit {

  recipes: Recipes[] = [];
  products: Product[] = [];

  constructor(
    private recipeService: RecipeService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    forkJoin({
      recipes: this.recipeService.getAll(),
      products: this.productService.getAll()
    }).subscribe(res => {
      this.recipes = res.recipes;
      this.products = res.products;
    });
  }

  getProductName(id: number): string {
    return this.products.find(p => p.id === id)?.name || 'N/A';
  }

  edit(r: Recipes) {
    this.router.navigate(['/recipes/edit', r.id]);
  }

  remove(id: number) {
    if (confirm('¿Eliminar receta?')) {
      this.recipeService.delete(id).subscribe(() => this.load());
    }
  }
}
