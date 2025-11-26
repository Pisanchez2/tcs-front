import { Component, computed, effect, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductSearchComponent } from '../../components/product-search/product-search.component';
import { ProductService } from '../../../../core/services/product.service';
import { IProduct } from '../../../../core/models/product.model';
import { DEFAULT_PAGE_SIZE } from '../../constants/product-pagination.constants';
import { ProductTableSizeItemsComponent } from '../../components/product-table-size-items/product-table-size-items.component';
import { Router } from '@angular/router';
import { ProductDeleteModalComponent } from '../../components/product-delete-modal/product-delete-modal.component';
import { ProductDataService } from '../../../../core/services/product-data.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { ErrorDisplayComponent } from '../../../../shared/components/error-display/error-display.component';
import { SkeletonLoaderComponent } from '../../../../shared/components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-products-page',
  imports: [
    ProductListComponent,
    ProductSearchComponent,
    ProductTableSizeItemsComponent,
    ProductDeleteModalComponent,
    ErrorDisplayComponent,
    SkeletonLoaderComponent
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  protected readonly productService = inject(ProductService);
  protected readonly router = inject(Router);
  protected readonly productDataService = inject(ProductDataService);
  protected readonly errorHandler = inject(ErrorHandlerService);

  products = signal<IProduct[]>([]);
  errorMessage = signal<string | null>(null);
  searchTerm = signal('');
  maxItems = signal(DEFAULT_PAGE_SIZE);
  isLoading = signal(false);

  filteredProducts = computed(() => {
    const searchValue = this.searchTerm().toLowerCase();
    let result = this.products();

    if (searchValue) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
      );
    }

    return result.slice(0, this.maxItems());
  });

  constructor() {
    effect(() => {
      if (this.productDataService.productWasDeleted()) {
        this.loadProducts();
        this.productDataService.setProductWasDeleted(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.errorMessage.set(null);
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.productService.getProducts().subscribe({
      next: (response) => {
        if (response?.data && Array.isArray(response.data)) {
          this.products.set(response.data);
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        const message = this.errorHandler.getErrorMessage(error);
        this.errorMessage.set(message);
        this.products.set([]);
        this.isLoading.set(false);
      }
    });
  }

  onSearchChanged(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  onPageSizeChanged(pageSize: number): void {
    this.maxItems.set(pageSize);
  }

  onCreateNewItem(): void {
    this.router.navigate(['/products/create']);
  }

  clearError(): void {
    this.errorMessage.set(null);
  }
}
