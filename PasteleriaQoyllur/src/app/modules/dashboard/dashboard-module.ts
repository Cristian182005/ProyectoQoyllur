import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { SalesChart } from './components/sales-chart/sales-chart';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHome} from './pages/home/home';
import { QuickCommercial } from './components/quick-commercial/quick-commercial';
import { QuickPurchases } from './components/quick-purchases/quick-purchases';
import { QuickProduction } from './components/quick-production/quick-production';
import { QuickInventory } from './components/quick-inventory/quick-inventory';
import { QuickAccess } from './components/quick-access/quick-access';
import { SummaryCards } from './components/summary-cards/summary-cards';

@NgModule({
  declarations: [
    DashboardHome,
    SummaryCards,
    SalesChart,
    QuickCommercial,
    QuickPurchases,
    QuickProduction,
    QuickInventory,
    QuickAccess
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
