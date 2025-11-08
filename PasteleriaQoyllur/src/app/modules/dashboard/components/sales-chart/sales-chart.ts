import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../orders/services/order-service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-sales-chart',
  standalone: false,
  templateUrl: './sales-chart.html',
  styleUrls: ['./sales-chart.css']
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
    domain: ['#ffb703', '#fb8500', '#b5838d', '#6d6875'] // 🎨 Colores QOYLLUR
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (orders) => {
        if (!orders || orders.length === 0) return; // 👈 evita errores si no hay datos

        // Agrupar las ventas por mes (YYYY-MM)
        const summary: { [key: string]: number } = {};

        for (const o of orders) {
          const month = o.date?.substring(0, 7) || 'Sin fecha';
          summary[month] = (summary[month] || 0) + o.total;
        }

        // Convertir el resumen a formato para ngx-charts
        this.chartData = Object.entries(summary).map(([name, value]) => ({
          name,
          value
        }));
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
      }
    });
  }
}
