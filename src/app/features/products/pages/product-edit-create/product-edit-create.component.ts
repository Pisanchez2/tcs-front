import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {IProduct} from '../../../../core/models/product.model';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../../../core/services/product.service';
import {CustomValidators} from '../../../../shared/validators/custom-validators';
import {ValidationComponent} from '../../../../shared/components/validation/validation.component';
import {ActivatedRoute, Router} from '@angular/router';
import {transformAndTrimFormValue} from '../../../../shared/utils/product.utils';
import {ProductDataService} from '../../../../core/services/product-data.service';

@Component({
  selector: 'app-product-edit-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ValidationComponent
  ],
  templateUrl: './product-edit-create.component.html',
  styleUrl: './product-edit-create.component.scss'
})
export class ProductEditCreateComponent implements OnInit {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly productService = inject(ProductService);
  protected readonly customValidators = inject(CustomValidators);
  protected readonly productDataService = inject(ProductDataService);
  protected readonly fb = inject(FormBuilder);

  product = signal<IProduct | null>(null);
  errorMessage = signal<string | null>(null);
  isEditing = computed(() => (this.product()?.id !== undefined))

  productForm = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.customValidators.idAlreadyExists()]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['', [Validators.required]],
    date_revision: ['', [Validators.required]]
  }, {validators: this.customValidators.dateRange()})

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    const productToEdit = this.productDataService.productToEdit();
    if (productId && productId !== productToEdit?.id) {
      this.router.navigate(['/products']).then();
    }

    if (productToEdit !== null) {
      this.product.set(productToEdit)
      this.productForm.patchValue(productToEdit);
      this.productForm.get('id')?.disable();
    }
  }

  protected onReset() {
    this.productForm.reset();
  }

  protected onSubmit() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.getRawValue();
    const productData: IProduct = transformAndTrimFormValue(formValue);

    if (this.isEditing()) {
      this.productService.updateProduct(productData).subscribe({
        next: () => {
          this.router.navigate(['/products']).then()
        },
        error: (err) => this.errorMessage.set(err.error.message)
      })
    } else {
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.router.navigate(['/products']).then();
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
        }
      });
    }

  }
}
