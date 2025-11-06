import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../orders/services/order-service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-sales-chart',
  standalone: false,
  templateUrl: './sales-chart.html',
  styleUrl: './sales-chart.css',
})
export class SalesChart implements OnInit {

  view: [number, number] = [700, 300];

  chartData = [
    { name: 'Enero', value: 1500 },
    { name: 'Febrero', value: 2200 },
    { name: 'Marzo', value: 1800 }
  ];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
  }

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe(orders => {
      // Ejemplo de agrupación simple (mes - total ventas)
      const summary: { [key: string]: number } = {};
      for (let o of orders) {
        const month = o.date?.substring(0, 7) || 'Sin fecha';
        summary[month] = (summary[month] || 0) + o.total;
      }
      this.chartData = Object.entries(summary).map(([name, value]) => ({ name, value }));
    });
  }
}
