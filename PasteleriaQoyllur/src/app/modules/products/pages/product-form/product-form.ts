import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  standalone: false,
  styles: ``
})
export class ProductForm implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: string;

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      available: new FormControl(true)
    });

    // Detecta si hay un ID en la ruta → modo edición
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProduct(this.productId!);
      }
    });
  }

  loadProduct(id: string): void {
    this.service.getAll().subscribe(products => {
      const product = products.find(p => p.id === id);
      if (product) {
        this.productForm.patchValue(product);
      }
    });
  }

  save(): void {
    if (this.productForm.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const formValue = this.productForm.value;

    // 🔹 No incluimos "id" cuando creamos (JSON Server lo autoincrementa)
    const productData: Product = {
      name: formValue.name!,
      category: formValue.category!,
      price: formValue.price!,
      available: formValue.available!
    } as Product;

    const request = this.isEditMode
      ? this.service.update({ ...productData, id: this.productId! }) // ✅ si es edición, se envía el id
      : this.service.create(productData); // ✅ si es nuevo, se omite el id

    request.subscribe(() => {
      alert(this.isEditMode ? 'Producto actualizado con éxito 🎉' : 'Producto guardado con éxito 🎂');
      this.router.navigate(['/products']);
    });
  }
}
