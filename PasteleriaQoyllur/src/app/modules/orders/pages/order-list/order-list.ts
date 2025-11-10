import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { Order } from '../../../../shared/models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.html',
  standalone: false,
})
export class OrderList implements OnInit {
  orders: Order[] = [];

  constructor(private service: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.service.getAll().subscribe((data) => {
      this.orders = data;
    });
  }

  addOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  editOrder(order: Order): void {
    this.router.navigate(['/orders/edit', order.id]);
  }

  deleteOrder(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este pedido?')) {
      this.service.delete(id).subscribe(() => {
        alert('Pedido eliminado correctamente 🗑️');
        this.loadOrders();
      });
    }
  }
}
