import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableSizeItemsComponent } from './product-table-size-items.component';

describe('ProductTableSizeItemsComponent', () => {
  let component: ProductTableSizeItemsComponent;
  let fixture: ComponentFixture<ProductTableSizeItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTableSizeItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTableSizeItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
