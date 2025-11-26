import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {ProductListComponent} from '../../components/product-list/product-list.component';
import {ProductSearchComponent} from '../../components/product-search/product-search.component';
import {ProductService} from '../../../../core/services/product.service';
import {IProduct} from '../../../../core/models/product.model';
import {DEFAULT_PAGE_SIZE} from '../../constants/product-pagination.constants';
import {
  ProductTableSizeItemsComponent
} from '../../components/product-table-size-items/product-table-size-items.component';
import {Router} from '@angular/router';
import {ProductDeleteModalComponent} from '../../components/product-delete-modal/product-delete-modal.component';
import {ProductDataService} from '../../../../core/services/product-data.service';

@Component({
  selector: 'app-products-page',
  imports: [
    ProductListComponent,
    ProductSearchComponent,
    ProductTableSizeItemsComponent,
    ProductDeleteModalComponent
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  protected readonly productService = inject(ProductService);
  protected readonly router = inject(Router);
  protected readonly productDataService = inject(ProductDataService);

  products = signal<IProduct[]>([]);
  errorMessage = signal<string | null>(null);
  searchTerm = signal('');
  maxItems = signal(DEFAULT_PAGE_SIZE);

  filteredProducts = computed(() => {
    if (!this.searchTerm()) return this.products().slice(0, this.maxItems());

    return this.products().filter((product) => {
      const nameContainsSearchTerm = product.name.toLowerCase().includes(this.searchTerm().toLowerCase());
      const descriptionContainsSearchTerm = product.description.toLowerCase().includes(this.searchTerm().toLowerCase());
      return nameContainsSearchTerm || descriptionContainsSearchTerm;
    })
  })

  constructor() {
    effect(() => {
      const itemRemoved = this.productDataService.productWasDeleted();
      if (itemRemoved) {
        this.loadProducts();
        this.productDataService.setProductWasDeleted(false);
      }
    });
  }


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        if (resp.data) this.products.set(resp.data.map(product => ({...product})))
      },
      error: (err) => {
        this.errorMessage.set(err.error.message);
      }
    });
  }

  onSearchChanged(searchTerm: string) {
    this.loadProducts();
    this.searchTerm.set(searchTerm);
  }

  onPageSizeChanged(pageSize: number) {
    this.loadProducts();
    this.maxItems.set(pageSize);
  }

  onCreateNewItem() {
    this.router.navigate(['/products/create']).then();
  }
}
