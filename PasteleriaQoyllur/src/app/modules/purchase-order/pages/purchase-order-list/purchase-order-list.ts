import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchase-order-service';
import { SupplierService } from '../../../suppliers/services/supplier-service';
import { PurchaseOrder } from '../../../../shared/models/purchaseOrder';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.html',
  standalone: false
})
export class PurchaseOrderList implements OnInit {

  orders: PurchaseOrder[] = [];
  suppliersMap: Record<number, string> = {};

  constructor(
    private service: PurchaseOrderService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.supplierService.getAll().subscribe(sups => {
      this.suppliersMap = Object.fromEntries(
        sups.map(s => [s.id!, s.name])
      );

      this.service.getAll().subscribe(data => {
        this.orders = data;
      });
    });
  }

  getSupplierName(id: number): string {
    return this.suppliersMap[id] || 'N/A';
  }

  delete(id: number): void {
    if (confirm('¿Eliminar esta orden de compra?')) {
      this.service.delete(id).subscribe(() => {
        alert('Orden eliminada');
        this.loadData();
      });
    }
  }
}
