import {Component, inject, input} from '@angular/core';
import {IProduct} from '../../../../core/models/product.model';
import {Router} from '@angular/router';
import {ProductDataService} from '../../../../core/services/product-data.service';
import {ModalService} from '../../../../core/services/modal.service';
import {ProductService} from '../../../../core/services/product.service';

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
  product = input<IProduct>();

  onEditProduct() {
    if (this.product()?.id) {
      this.productDataService.setProductToEdit(this.product()!);
      this.router.navigate([`/products/edit/${this.product()?.id}`]).then()
    }
  }

  onDeleteProduct() {
    this.modalService.confirmDelete(this.product()!).then(
      confirmed => {
        if (confirmed) {
          this.productService.deleteProduct(this.product()?.id!).subscribe(() => {
            this.productDataService.setProductWasDeleted(true);
          });
        }
      }
    )
  }
}
