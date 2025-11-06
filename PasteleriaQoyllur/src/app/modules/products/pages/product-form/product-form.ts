import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styles: ``,
})
export class ProductForm {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    available: new FormControl(true)
  });

  constructor(private service: ProductService, private router: Router) {}

  save() {
    if (this.productForm.valid) {
      this.service.create(this.productForm.value as any).subscribe(() => {
        alert('Producto guardado con éxito');
        this.router.navigate(['/products']);
      });
    }
  }
}
