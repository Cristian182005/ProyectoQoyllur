import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../shared/models/product';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../categories/services/category-service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  standalone: false,
  styles: ``,
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: string;

  categories: Category[] = []; // ✔ categorías cargadas desde BD

  constructor(
    private service: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✔ Cargar categorías
    this.categoryService.getAll().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Error cargando categorías:', err),
    });

    // ✔ Inicializar formulario
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      available: new FormControl(true),
    });

    // ✔ Modo edición
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProduct(this.productId!);
      }
    });
  }

  loadProduct(id: string): void {
    const idNumber = Number(id);

    this.service.getAll().subscribe((products) => {
      const product = products.find((p) => p.id === idNumber);
      if (product) {
        this.productForm.patchValue(product);
      }
    });
  }

  // ⭐ NUEVO: botón ➕ Nueva Categoría
  goToNewCategory(): void {
    this.router.navigate(['/categories/new'], {
      queryParams: { from: 'products' },
    });
  }

  save(): void {
    if (this.productForm.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const formValue = this.productForm.value;

    const productData: Product = {
      name: formValue.name!,
      categoryId: Number(formValue.categoryId),
      price: formValue.price!,
      available: formValue.available!,
    };

    const request = this.isEditMode
      ? this.service.update({ ...productData, id: Number(this.productId) })
      : this.service.create(productData);

    request.subscribe(() => {
      alert(this.isEditMode ? 'Producto actualizado 🔄' : 'Producto guardado 🎉');
      this.router.navigate(['/products']);
    });
  }
}
