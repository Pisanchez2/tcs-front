import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';

import {ProductEditCreateComponent} from './product-edit-create.component';

describe('ProductEditCreateComponent', () => {
  let component: ProductEditCreateComponent;
  let fixture: ComponentFixture<ProductEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEditCreateComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => null}}}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form and error message when onReset is called', () => {
    component.productForm.setValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2023-01-01',
      date_revision: '2025-01-01'
    });
    component.errorMessage.set('Test error');

    component.onReset();

    expect(component.productForm.value).toEqual({
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null
    });
    expect(component.errorMessage()).toBeNull();
  });

  it('should clear the error message when clearError is called', () => {
    component.errorMessage.set('Test error');

    component.clearError();

    expect(component.errorMessage()).toBeNull();
  });

  it('should validate the name field as required and minimum length', () => {
    const nameControl = component.productForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.invalid).toBeTruthy();
    expect(nameControl?.errors?.['required']).toBeTruthy();

    nameControl?.setValue('123');
    expect(nameControl?.invalid).toBeTruthy();
    expect(nameControl?.errors?.['minlength']).toBeTruthy();
  });

});
