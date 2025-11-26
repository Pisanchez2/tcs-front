import { Component, input } from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { ProductActionsComponent } from '../product-actions/product-actions.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductActionsComponent,
    DatePipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products = input<IProduct[]>([]);
}
