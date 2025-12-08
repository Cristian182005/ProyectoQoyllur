import { Component, OnInit, HostListener } from '@angular/core';
import { OrderService } from '../../../orders/services/order-service';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.html',
  standalone: false
})
export class SalesChart implements OnInit {

  view: [number, number] = [700, 300];

  chartData: { name: string; value: number }[] = [];

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#ffb703', '#fb8500', '#b5838d', '#6d6875']
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.updateChartSize();
    this.loadData();
  }

  @HostListener('window:resize')
  updateChartSize() {
    const width = window.innerWidth;

    if (width < 576) this.view = [350, 250];       // Móvil
    else if (width < 992) this.view = [600, 300];  // Tablet
    else this.view = [900, 350];                   // Desktop
  }

  loadData() {
    this.orderService.getAll().subscribe(orders => {
      const summary: { [key: string]: number } = {};

      orders.forEach(o => {
        const month = o.date?.substring(0, 7) || 'Sin fecha';
        summary[month] = (summary[month] || 0) + o.total;
      });

      this.chartData = Object.entries(summary).map(([name, value]) => ({
        name, value
      }));
    });
  }
}
