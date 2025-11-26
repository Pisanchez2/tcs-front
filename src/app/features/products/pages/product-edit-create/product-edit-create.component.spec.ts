import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditCreateComponent } from './product-edit-create.component';

describe('ProductEditCreateComponent', () => {
  let component: ProductEditCreateComponent;
  let fixture: ComponentFixture<ProductEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
