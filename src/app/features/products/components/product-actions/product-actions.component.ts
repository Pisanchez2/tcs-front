import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { Router } from '@angular/router';
import { ProductDataService } from '../../../../core/services/product-data.service';
import { ModalService } from '../../../../core/services/modal.service';
import { ProductService } from '../../../../core/services/product.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';

@Component({
  selector: 'app-product-actions',
  imports: [],
  templateUrl: './product-actions.component.html',
  styleUrl: './product-actions.component.scss'
})
export class ProductActionsComponent {
  protected readonly router = inject(Router);
  protected readonly productDataService = inject(ProductDataService);
  protected readonly modalService = inject(ModalService);
  protected readonly productService = inject(ProductService);
  protected readonly errorHandler = inject(ErrorHandlerService);

  product = input<IProduct>();
  isDeleting = signal(false);

  onEditProduct(): void {
    const prod = this.product();
    if (prod?.id) {
      this.productDataService.setProductToEdit(prod);
      this.router.navigate([`/products/edit/${prod.id}`]);
    }
  }

  onDeleteProduct(): void {
    const prod = this.product();
    if (!prod) return;

    this.modalService.confirmDelete(prod).then((confirmed) => {
      if (confirmed) {
        this.isDeleting.set(true);
        this.productService.deleteProduct(prod.id).subscribe({
          next: () => {
            this.productDataService.setProductWasDeleted(true);
            this.isDeleting.set(false);
          },
          error: (error) => {
            const message = this.errorHandler.getErrorMessage(error);
            this.errorHandler.setError(message);
            this.isDeleting.set(false);
          }
        });
      }
    });
  }
}
