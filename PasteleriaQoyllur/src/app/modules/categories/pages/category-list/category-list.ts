import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { Category } from '../../../../shared/models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  standalone: false,
})
export class CategoryList implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: () => alert('Error cargando categorías'),
    });
  }

  editCategory(id: number): void {
    this.router.navigate(['/categories/edit', id]);
  }

  deleteCategory(id: number): void {
    if (confirm('¿Eliminar categoría?')) {
      this.categoryService.delete(id).subscribe(() => {
        alert('Categoría eliminada 🗑️');
        this.loadCategories();
      });
    }
  }
}
