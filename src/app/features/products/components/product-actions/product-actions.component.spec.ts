import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';

import {ProductActionsComponent} from './product-actions.component';
import {ProductDataService} from '../../../../core/services/product-data.service';
import {ModalService} from '../../../../core/services/modal.service';
import {ProductService} from '../../../../core/services/product.service';
import {ErrorHandlerService} from '../../../../core/services/error-handler.service';


describe('ProductActionsComponent', () => {
  let component: ProductActionsComponent;
  let fixture: ComponentFixture<ProductActionsComponent>;
  let mockRouter: Partial<Router>;
  let mockProductDataService: Partial<ProductDataService>;
  let mockModalService: Partial<ModalService>;
  let mockProductService: Partial<ProductService>;
  let mockErrorHandler: Partial<ErrorHandlerService>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };
    mockProductDataService = {
      setProductToEdit: jest.fn(),
      setProductWasDeleted: jest.fn(),
    };
    mockModalService = {
      confirmDelete: jest.fn(),
    };
    mockProductService = {
      deleteProduct: jest.fn(),
    };
    mockErrorHandler = {
      getErrorMessage: jest.fn(),
      setError: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProductActionsComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: ProductDataService, useValue: mockProductDataService},
        {provide: ModalService, useValue: mockModalService},
        {provide: ProductService, useValue: mockProductService},
        {provide: ErrorHandlerService, useValue: mockErrorHandler},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActionsComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2023-01-01',
      date_revision: '2023-06-01',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEditProduct', () => {
    it('should navigate to edit page with correct product id', () => {
      component.onEditProduct();

      expect(mockProductDataService.setProductToEdit).toHaveBeenCalledWith(component.product());
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit/1']);
    });

    it('should not navigate if product is null', () => {
      fixture.componentRef.setInput('product', null);

      component.onEditProduct();

      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(mockProductDataService.setProductToEdit).not.toHaveBeenCalled();
    });
  });

  describe('onDeleteProduct', () => {
    it('should confirm and delete the product successfully', fakeAsync(() => {
      jest.spyOn(mockModalService, 'confirmDelete').mockResolvedValue(true);
      jest.spyOn(mockProductService, 'deleteProduct').mockReturnValue(
        of({message: 'Product removed successfully'})
      );
      component.onDeleteProduct();
      flush();

      expect(mockModalService.confirmDelete).toHaveBeenCalledWith(component.product());
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith('1');
      expect(mockProductDataService.setProductWasDeleted).toHaveBeenCalledWith(true);
      expect(component.isDeleting()).toBe(false);
    }));

    it('should handle deletion cancellation', async () => {
      jest.spyOn(mockModalService, 'confirmDelete').mockResolvedValue(false);

      component.onDeleteProduct();

      expect(mockModalService.confirmDelete).toHaveBeenCalledWith(component.product());
      expect(mockProductService.deleteProduct).not.toHaveBeenCalled();
      expect(component.isDeleting()).toBe(false);
    });

    it('should handle errors during deletion', fakeAsync(() => {
      jest.spyOn(mockModalService, 'confirmDelete').mockResolvedValue(true);
      jest
        .spyOn(mockProductService, 'deleteProduct')
        .mockReturnValue(throwError(() => new Error('Delete failed')));
      jest.spyOn(mockErrorHandler, 'getErrorMessage').mockReturnValue('Delete failed');

      component.onDeleteProduct();
      flush();

      expect(mockModalService.confirmDelete).toHaveBeenCalledWith(component.product());
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith('1');
      expect(mockErrorHandler.setError).toHaveBeenCalledWith('Delete failed');
      expect(component.isDeleting()).toBe(false);
    }));

    it('should not proceed if product is null', async () => {
      fixture.componentRef.setInput('product', null);

      component.onDeleteProduct();

      expect(mockModalService.confirmDelete).not.toHaveBeenCalled();
      expect(mockProductService.deleteProduct).not.toHaveBeenCalled();
    });
  });
});
