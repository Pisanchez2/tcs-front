import { Injectable, signal } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  isOpen = signal(false);
  selectedProduct = signal<IProduct | null>(null);

  open(item: IProduct) {
    this.selectedProduct.set(item);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    this.selectedProduct.set(null);
  }

  isOpenDelete = signal(false);
  productToDelete = signal<IProduct | null>(null);

  private resolver: ((value: boolean) => void) | null = null;

  confirmDelete(product: IProduct): Promise<boolean> {
    this.productToDelete.set(product);
    this.isOpenDelete.set(true);

    return new Promise<boolean>(resolve => {
      this.resolver = resolve;
    });
  }

  acceptDelete() {
    this.isOpenDelete.set(false);
    this.resolver?.(true);
    this.clearDeleteState();
  }

  cancelDelete() {
    this.isOpenDelete.set(false);
    this.resolver?.(false);
    this.clearDeleteState();
  }

  private clearDeleteState() {
    this.productToDelete.set(null);
    this.resolver = null;
  }
}
