import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier-service';
import { Router } from '@angular/router';
import { Suppliers } from '../../../../shared/models/suppliers';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.html',
  standalone: false
})
export class SupplierList implements OnInit {

  suppliers: Suppliers[] = [];

  constructor(private service: SupplierService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getAll().subscribe(data => this.suppliers = data);
  }

  edit(s: Suppliers): void {
    this.router.navigate(['/suppliers/edit', s.id]);
  }

  remove(id: number): void {
    if (confirm('¿Eliminar proveedor?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
