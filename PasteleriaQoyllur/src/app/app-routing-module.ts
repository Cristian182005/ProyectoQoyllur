import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404 } from './shared/components/error404/error404';
import { AuthGuard } from './modules/auth/guards/authGuard';
import { RoleGuard } from './modules/auth/guards/roleGuard';

const routes: Routes = [

  // ----------- AUTH (PÚBLICO) -----------
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then(m => m.AuthModule),
  },

  // ----------- DASHBOARD (TODOS LOS ROLES LOGUEADOS) -----------
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule),
  },

  // ============================================
  // 📌 GESTIÓN COMERCIAL (ADMIN + COMERCIAL)
  // ============================================
  {
    path: 'products',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] },
    loadChildren: () =>
      import('./modules/products/products-module').then(m => m.ProductsModule),
  },
  {
    path: 'categories',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] },
    loadChildren: () =>
      import('./modules/categories/categories-module').then(m => m.CategoriesModule),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] },
    loadChildren: () =>
      import('./modules/customers/customers-module').then(m => m.CustomersModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 2] },
    loadChildren: () =>
      import('./modules/orders/orders-module').then(m => m.OrdersModule),
  },

  // ============================================
  // 📌 GESTIÓN DE COMPRAS (ADMIN + COMPRAS)
  // ============================================
  {
    path: 'suppliers',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 3] },
    loadChildren: () =>
      import('./modules/suppliers/suppliers-module').then(m => m.SuppliersModule),
  },
  {
    path: 'purchase-orders',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 3] },
    loadChildren: () =>
      import('./modules/purchase-order/purchase-order-module').then(m => m.PurchaseOrderModule),
  },
  {
    path: 'purchase-details',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 3] },
    loadChildren: () =>
      import('./modules/purchase-details/purchase-details-module').then(m => m.PurchaseDetailsModule),
  },

  // ============================================
  // 📌 PRODUCCIÓN (ADMIN + PRODUCCIÓN)
  // ============================================
  {
    path: 'units',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 4] },
    loadChildren: () =>
      import('./modules/units/units-module').then(m => m.UnitsModule),
  },
  {
    path: 'ingredients',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 4] },
    loadChildren: () =>
      import('./modules/ingredients/ingredients-module').then(m => m.IngredientsModule),
  },
  {
    path: 'recipes',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 4] },
    loadChildren: () =>
      import('./modules/recipes/recipes-module').then(m => m.RecipesModule),
  },

  // ============================================
  // 📌 INVENTARIO (ADMIN + INVENTARIO)
  // ============================================
  {
    path: 'inventory',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 5] },
    loadChildren: () =>
      import('./modules/inventory/inventory-module').then(m => m.InventoryModule),
  },
  {
    path: 'inventory-movements',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1, 5] },
    loadChildren: () =>
      import('./modules/inventory-movement/inventory-movement-module').then(m => m.InventoryMovementModule),
  },

  // ============================================
  // 📌 ADMINISTRADOR (SOLO ADMIN)
  // ============================================
  {
    path: 'employees',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] },
    loadChildren: () =>
      import('./modules/employee/employee-module').then(m => m.EmployeeModule),
  },
  {
    path: 'roles',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] },
    loadChildren: () =>
      import('./modules/roles/roles-module').then(m => m.RolesModule),
  },

  // ----------- Redirección inicial -----------
  { path: '', redirectTo: '/auth', pathMatch: 'full' },

  // ----------- 404 -----------
  { path: '**', component: Error404 }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
