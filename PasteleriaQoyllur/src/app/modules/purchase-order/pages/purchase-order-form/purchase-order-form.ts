import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PurchaseOrderService } from '../../services/purchase-order-service';
import { SupplierService } from '../../../suppliers/services/supplier-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrder } from '../../../../shared/models/purchaseOrder';

@Component({
  selector: 'app-purchase-order-form',
  templateUrl: './purchase-order-form.html',
  standalone: false
})
export class PurchaseOrderForm implements OnInit {

  orderForm!: FormGroup;
  suppliers: any[] = [];
  isEdit = false;
  orderId?: number;

  constructor(
    private service: PurchaseOrderService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.orderForm = new FormGroup({
      supplierId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      total: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    this.supplierService.getAll().subscribe(data => this.suppliers = data);

    this.route.params.subscribe(p => {
      if (p['id']) {
        this.isEdit = true;
        this.orderId = Number(p['id']);
        this.loadOrder(this.orderId);
      }
    });
  }

  loadOrder(id: number): void {
    this.service.getById(id).subscribe(order => {
      this.orderForm.patchValue(order);
    });
  }

  save(): void {
    if (this.orderForm.invalid) {
      alert('Complete todos los campos');
      return;
    }

    const data = this.orderForm.value as PurchaseOrder;

    const request = this.isEdit
      ? this.service.update({ ...data, id: this.orderId })
      : this.service.create(data);

    request.subscribe(() => {
      alert(this.isEdit ? 'Orden actualizada' : 'Orden creada');
      this.router.navigate(['/purchase-orders']);
    });
  }
}
