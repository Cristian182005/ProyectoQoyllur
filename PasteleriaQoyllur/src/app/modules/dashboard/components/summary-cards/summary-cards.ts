import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../products/services/product-service';
import { CustomerService } from '../../../customers/services/customer-service';
import { OrderService } from '../../../orders/services/order-service';

@Component({
  selector: 'app-summary-cards',
  standalone: false,
  templateUrl: './summary-cards.html',
  styleUrls: ['./summary-cards.css'],
})
export class SummaryCards implements OnInit{
    totalProducts = 0;
  totalCustomers = 0;
  totalOrders = 0;

  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => this.totalProducts = data.length);
    this.customerService.getAll().subscribe(data => this.totalCustomers = data.length);
    this.orderService.getAll().subscribe(data => this.totalOrders = data.length);
  }
}
