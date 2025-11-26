import {Routes} from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products-page/products-page.component').then(m => m.ProductsPageComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/product-edit-create/product-edit-create.component').then(m => m.ProductEditCreateComponent)
  }, {
    path: 'create',
    loadComponent: () => import('./pages/product-edit-create/product-edit-create.component').then(m => m.ProductEditCreateComponent)
  }
];
