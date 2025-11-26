import {Routes} from '@angular/router';
import {MainLayoutComponent} from './layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)
      },
      {path: '', redirectTo: 'products', pathMatch: 'full'}
    ]
  }
];
