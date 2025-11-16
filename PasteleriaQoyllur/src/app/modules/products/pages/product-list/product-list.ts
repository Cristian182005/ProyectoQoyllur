import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../../../shared/models/product';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../categories/services/category-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  standalone: false,
  styles: ``,
})
export class ProductList implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error categorías:', err)
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error productos:', err),
    });
  }

  getCategoryName(categoryId: number): string {
    const c = this.categories.find(cat => cat.id === categoryId);
    return c ? c.name : 'Sin categoría';
  }

  editProduct(product: Product): void {
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Producto eliminado correctamente 🗑️');
        this.loadProducts();
      });
    }
  }
}
