import { Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly _isOpenDelete = signal(false);
  private readonly _productToDelete = signal<IProduct | null>(null);
  private resolver: ((value: boolean) => void) | null = null;

  readonly isOpenDelete = this._isOpenDelete.asReadonly();
  readonly productToDelete = this._productToDelete.asReadonly();

  confirmDelete(product: IProduct): Promise<boolean> {
    this._productToDelete.set(product);
    this._isOpenDelete.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  acceptDelete(): void {
    this._isOpenDelete.set(false);
    this.resolver?.(true);
    this.clearDeleteState();
  }

  cancelDelete(): void {
    this._isOpenDelete.set(false);
    this.resolver?.(false);
    this.clearDeleteState();
  }

  private clearDeleteState(): void {
    this._productToDelete.set(null);
    this.resolver = null;
  }
}
