import { computed, Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private readonly _productToEdit = signal<IProduct | null>(null);
  private readonly _productWasDeleted = signal(false);

  readonly productToEdit = computed(() => this._productToEdit());
  readonly productWasDeleted = computed(() => this._productWasDeleted());

  setProductToEdit(product: IProduct | null): void {
    this._productToEdit.set(product);
  }

  setProductWasDeleted(deleted: boolean): void {
    this._productWasDeleted.set(deleted);
  }

  clearProductToEdit(): void {
    this._productToEdit.set(null);
  }

  clear(): void {
    this._productToEdit.set(null);
    this._productWasDeleted.set(false);
  }
}
