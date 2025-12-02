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
    loadChildren: () =>
      import('./modules/products/products-module').then((m) => m.ProductsModule),
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
    loadChildren: () =>
      import('./modules/orders/orders-module').then((m) => m.OrdersModule),
  },
  {
    path: 'suppliers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/suppliers/suppliers-module').then(m => m.SuppliersModule)
  },
  {
    path: 'units',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/units/units-module').then(m => m.UnitsModule)
  },
  {
    path: 'ingredients',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/ingredients/ingredients-module').then(m => m.IngredientsModule)
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/recipes/recipes-module').then(m => m.RecipesModule)
  },
  {
    path: 'purchase-order',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/purchase-order/purchase-order-module').then(m => m.PurchaseOrderModule)
  },
  {
    path: 'purchase-details',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/purchase-details/purchase-details-module').then(m => m.PurchaseDetailsModule)
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/inventory/inventory-module').then(m => m.InventoryModule)
  },
  {
    path: 'inventory-movements',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/inventory-movement/inventory-movement-module').then(m => m.InventoryMovementModule)
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/employee/employee-module').then(m => m.EmployeeModule)
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('./modules/roles/roles-module').then(m => m.RolesModule)
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
export class AppRoutingModule { }
