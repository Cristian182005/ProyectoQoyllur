import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404 } from './shared/components/error404/error404';
import { AuthGuard } from './modules/auth/guards/authGuard';

const routes: Routes = [
  // Ruta pública
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then((m) => m.AuthModule),
  },

  // Rutas protegidas
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/products/products-module').then((m) => m.ProductsModule),
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/categories/categories-module').then((m) => m.CategoriesModule),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/customers/customers-module').then((m) => m.CustomersModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/orders/orders-module').then((m) => m.OrdersModule),
  },

  // Redirección por defecto
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  // 404
  { path: '**', component: Error404 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
