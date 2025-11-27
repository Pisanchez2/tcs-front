import { Component, computed, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { IProduct } from '../../../../core/models/product.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { ValidationComponent } from '../../../../shared/components/validation/validation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { mapFormValuesToProduct } from '../../../../shared/utils/product.utils';
import { ProductDataService } from '../../../../core/services/product-data.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ErrorDisplayComponent } from '../../../../shared/components/error-display/error-display.component';

@Component({
  selector: 'app-product-edit-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationComponent,
    ErrorDisplayComponent
  ],
  templateUrl: './product-edit-create.component.html',
  styleUrl: './product-edit-create.component.scss'
})
export class ProductEditCreateComponent implements OnInit, OnDestroy {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly productService = inject(ProductService);
  protected readonly customValidators = inject(CustomValidators);
  protected readonly productDataService = inject(ProductDataService);
  protected readonly errorHandler = inject(ErrorHandlerService);
  protected readonly notificationService = inject(NotificationService);
  protected readonly fb = inject(FormBuilder);

  product = signal<IProduct | null>(null);
  errorMessage = signal<string | null>(null);
  isSubmitting = signal(false);

  isEditing = computed(() => this.product()?.id !== undefined);

  productForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.customValidators.idAlreadyExists()]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['', [Validators.required]],
    date_revision: ['', [Validators.required]]
  }, { validators: this.customValidators.dateRange() });

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const productToEdit = this.productDataService.productToEdit();

    if (productId && productId !== productToEdit?.id) {
      this.router.navigate(['/products']);
      return;
    }

    if (productToEdit) {
      this.product.set(productToEdit);
      this.productForm.patchValue(productToEdit);
      this.productForm.get('id')?.disable();
    }
  }

  ngOnDestroy(): void {
    this.errorMessage.set(null);
    if (this.isEditing()) {
      this.productDataService.clearProductToEdit();
    }
  }

  onReset(): void {
    this.productForm.reset();
    this.errorMessage.set(null);
  }

  onSubmit(): void {
    if (this.productForm.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formValue = this.productForm.getRawValue();
    const productData: IProduct = mapFormValuesToProduct(formValue);

    if (this.isEditing()) {
      this.updateProduct(productData);
    } else {
      this.createProduct(productData);
    }
  }

  createProduct(productData: IProduct): void {
    this.productService.createProduct(productData).subscribe({
      next: () => {
        this.notificationService.success('Producto creado exitosamente');
        setTimeout(() => this.router.navigate(['/products']), 500);
        this.isSubmitting.set(false);
      },
      error: (error) => {
        const message = this.errorHandler.getErrorMessage(error);
        this.errorMessage.set(message);
        this.isSubmitting.set(false);
      }
    });
  }

  updateProduct(productData: IProduct): void {
    this.productService.updateProduct(productData).subscribe({
      next: () => {
        this.notificationService.success('Producto actualizado exitosamente');
        setTimeout(() => this.router.navigate(['/products']), 500);
        this.isSubmitting.set(false);
        this.productDataService.clearProductToEdit();
      },
      error: (error) => {
        const message = this.errorHandler.getErrorMessage(error);
        this.errorMessage.set(message);
        this.isSubmitting.set(false);
      }
    });
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
