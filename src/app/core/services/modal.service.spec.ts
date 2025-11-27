import {TestBed} from '@angular/core/testing';
import {ModalService} from './modal.service';
import {IProduct} from '../models/product.model';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open delete modal and return a promise when confirmDelete is called', async () => {
    const mockProduct: IProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01'
    };

    const promise = service.confirmDelete(mockProduct);

    expect(service.isOpenDelete()).toBe(true);
    expect(service.productToDelete()).toEqual(mockProduct);

    service.acceptDelete();
    const result = await promise;
    expect(result).toBe(true);
  });

  it('should resolve promise as true and reset state when acceptDelete is called', async () => {
    const mockProduct: IProduct = {
      id: '1',
      name: 'Product Name',
      description: 'Test Description',
      logo: 'logo.png',
      date_release: '2023-01-01',
      date_revision: '2024-01-01'
    };

    const promise = service.confirmDelete(mockProduct);

    service.acceptDelete();

    expect(service.isOpenDelete()).toBe(false);
    expect(service.productToDelete()).toBe(null);
    const result = await promise;
    expect(result).toBe(true);
  });

  it('should resolve promise as false and reset state when cancelDelete is called', async () => {
    const mockProduct: IProduct = {
      id: '1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01'
    };

    const promise = service.confirmDelete(mockProduct);

    service.cancelDelete();

    expect(service.isOpenDelete()).toBe(false);
    expect(service.productToDelete()).toBe(null);
    const result = await promise;
    expect(result).toBe(false);
  });

  it('should initialize with default state and expose readonly signals', () => {
    expect(service.isOpenDelete()).toBe(false);
    expect(service.productToDelete()).toBe(null);
  });
});
