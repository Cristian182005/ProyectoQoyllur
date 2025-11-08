import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { Home } from './pages/home/home';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { SalesChart } from './components/sales-chart/sales-chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Home,
    SummaryCards,
    SalesChart
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
