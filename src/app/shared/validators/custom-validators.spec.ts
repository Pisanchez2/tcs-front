import {TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {firstValueFrom, Observable, of} from 'rxjs';
import {CustomValidators} from './custom-validators';
import {ProductService} from '../../core/services/product.service';

describe('CustomValidators', () => {
  let customValidators: CustomValidators;
  let mockProductService: ProductService;

  beforeEach(() => {
    mockProductService = {
      verifyProduct: jest.fn()
    } as unknown as ProductService;

    TestBed.configureTestingModule({
      providers: [
        CustomValidators,
        {provide: ProductService, useValue: mockProductService}
      ]
    });

    customValidators = TestBed.inject(CustomValidators);
  });

  describe('idAlreadyExists', () => {
    it('should return null if the control value is empty', async () => {
      const control = new FormControl('');
      const validatorFn = customValidators.idAlreadyExists();

      const result = await firstValueFrom(validatorFn(control) as Observable<ValidationErrors | null>);
      expect(result).toBeNull();
    });

    it('should return null if product does not exist', async () => {
      jest.spyOn(mockProductService, 'verifyProduct').mockReturnValue(of(false));
      const control = new FormControl('test-id');
      const validatorFn = customValidators.idAlreadyExists();

      const result = await firstValueFrom(validatorFn(control) as Observable<ValidationErrors | null>);
      expect(result).toBeNull();
    });

    it('should return validation error if product exists', async () => {
      jest.spyOn(mockProductService, 'verifyProduct').mockReturnValue(of(true));
      const control = new FormControl('test-id');
      const validatorFn = customValidators.idAlreadyExists();

      const result = await firstValueFrom(validatorFn(control) as Observable<ValidationErrors | null>);
      expect(result).toEqual({idAlreadyExists: true});
    });
  });

  describe('dateRange', () => {
    it('should return null if one of the fields is not set', () => {
      const group = new FormGroup({
        date_release: new FormControl(null),
        date_revision: new FormControl('2025-12-01')
      });
      const validatorFn = customValidators.dateRange();

      const result = validatorFn(group);
      expect(result).toBeNull();
    });

    it('should return a validation error if release date is in the past', () => {
      const group = new FormGroup({
        date_release: new FormControl('2023-01-01'),
        date_revision: new FormControl('2025-12-01')
      });
      const validatorFn = customValidators.dateRange();

      const result = validatorFn(group);
      expect(result).toEqual({dateRange: true});
    });

    it('should return a validation error if release date is after or equal revision date', () => {
      const group = new FormGroup({
        date_release: new FormControl('2025-12-02'),
        date_revision: new FormControl('2025-12-01')
      });
      const validatorFn = customValidators.dateRange();

      const result = validatorFn(group);
      expect(result).toEqual({dateRange: true});
    });

    it('should return a validation error if revision date is not exactly one year after release date', () => {
      const group = new FormGroup({
        date_release: new FormControl('2025-12-01'),
        date_revision: new FormControl('2026-11-30')
      });
      const validatorFn = customValidators.dateRange();

      const result = validatorFn(group);
      expect(result).toEqual({dateRange: true});
    });

    it('should return null if the date range is valid (exactly one year apart)', () => {
      const group = new FormGroup({
        date_release: new FormControl('2025-12-01'),
        date_revision: new FormControl('2026-12-01')
      });
      const validatorFn = customValidators.dateRange();

      const result = validatorFn(group);
      expect(result).toBeNull();
    });
  });
});
