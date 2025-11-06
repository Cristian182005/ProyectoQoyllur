import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404 } from './shared/components/error404/error404';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule),
  },

  {
    path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard-module').then(m => m.DashboardModule),
  },

  {
    path: 'products', loadChildren: () => import('./modules/products/products-module').then(m => m.ProductsModule),
  },

  { path: '',
    redirectTo: 'login',
    pathMatch: 'full' },

  { path: '**',
    component: Error404 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
