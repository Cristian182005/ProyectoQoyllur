import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { ProductService } from '../../../products/services/product-service';
import { CustomerService } from '../../../customers/services/customer-service';
import { Product } from '../../../../shared/models/product';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.html',
  standalone: false,
})
export class OrderForm implements OnInit {
  orderForm!: FormGroup;
  products: Product[] = [];
  customerName: string = '';
  isEditMode: boolean = false;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      customerId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      total: new FormControl(0),
      items: new FormArray([]),
    });

    // Cargar lista de productos
    this.productService.getAll().subscribe((data) => (this.products = data));

    // Verificar cliente válido
    this.orderForm.get('customerId')?.valueChanges.subscribe((id) => {
      if (id) this.checkCustomer(id);
      else this.customerName = '';
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = new FormGroup({
      productId: new FormControl('', Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      price: new FormControl({ value: 0, disabled: true }, Validators.required), // 🔒 ya no editable
    });
    this.items.push(item);

    // Escucha cambios de producto y cantidad
    item.get('productId')?.valueChanges.subscribe((val) => {
      const id = val ? parseInt(val.toString(), 10) : 0;
      const selected = this.products.find((p) => p.id === id);
      if (selected) {
        item.get('price')?.setValue(selected.price);
        this.calculateTotal();
      }
    });

    item.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal(): void {
    const total = this.items.controls.reduce((sum, item) => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return sum + quantity * price;
    }, 0);
    this.orderForm.get('total')?.setValue(total);
  }

  checkCustomer(id: number): void {
    this.customerService.getById(id).subscribe({
      next: (customer: Customer) => {
        this.customerName = customer.name;
      },
      error: () => {
        this.customerName = '';
        alert('❌ El ID de cliente no existe. No puedes crear el pedido.');
        this.orderForm.get('customerId')?.setValue('');
      },
    });
  }

  save(): void {
    if (this.orderForm.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    if (!this.customerName) {
      alert('No puedes registrar un pedido sin un cliente válido.');
      return;
    }

    // Convertir a JSON sin los campos deshabilitados
    const orderData = {
      ...this.orderForm.getRawValue(),
      items: this.items.getRawValue(),
    };

    this.orderService.create(orderData).subscribe(() => {
      alert('Pedido registrado con éxito 🧾');
      this.router.navigate(['/orders']);
    });
  }
}
