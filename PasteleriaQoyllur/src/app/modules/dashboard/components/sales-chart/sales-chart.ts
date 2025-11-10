import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../orders/services/order-service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-sales-chart',
  standalone: false,
  templateUrl: './sales-chart.html',
  styles: ``
})
export class SalesChart implements OnInit {

  view: [number, number] = [700, 300];

  chartData: { name: string; value: number }[] = []; // ← limpio

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ffb703', '#fb8500', '#b5838d', '#6d6875'] // 🎨 colores QOYLLUR
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        if (!orders || orders.length === 0) return;

        const summary: { [key: string]: number } = {};

        for (const o of orders) {
          const month = o.date?.substring(0, 7) || 'Sin fecha';
          summary[month] = (summary[month] || 0) + o.total;
        }

        this.chartData = Object.entries(summary).map(([name, value]) => ({
          name,
          value
        }));
      },
      error: (err) => console.error('Error al obtener pedidos:', err)
    });
  }
}
