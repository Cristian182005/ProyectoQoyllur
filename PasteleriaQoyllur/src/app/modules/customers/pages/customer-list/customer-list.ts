import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { Customer } from '../../../../shared/models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  standalone: false,
})
export class CustomerList implements OnInit {
  customers: Customer[] = [];

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.service.getAll().subscribe((data) => {
      this.customers = data;
    });
  }

  addCustomer(): void {
    this.router.navigate(['/customers/new']);
  }

  editCustomer(customer: Customer): void {
    this.router.navigate(['/customers/edit', customer.id]);
  }

  deleteCustomer(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este cliente?')) {
      this.service.delete(id).subscribe(() => {
        alert('Cliente eliminado correctamente 🗑️');
        this.loadCustomers();
      });
    }
  }
}
