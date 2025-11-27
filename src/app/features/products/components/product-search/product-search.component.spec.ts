import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {ProductSearchComponent} from './product-search.component';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ProductSearchComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with default placeholder', () => {
    expect(component.placeholder()).toBe('Search...');
  });

  it('should the placeholder be the value of the placeholder input', () => {
    fixture.componentRef.setInput('placeholder', 'Test placeholder');
    expect(component.placeholder()).toBe('Test placeholder');
  })

  it('should emit the correct value when searchControl changes', (done) => {
    const testValue = 'test search query';
    component.searchChanged.subscribe((value) => {
      expect(value).toBe(testValue);
      done();
    });
    component.searchControl.setValue(testValue);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
