import {inject, Injectable} from '@angular/core';
import {ProductService} from '../../core/services/product.service';
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {debounceTime, map, Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  productService = inject(ProductService);

  idAlreadyExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value?.trim() === "") return of(null);

      return of(control.value).pipe(debounceTime(500),
        switchMap(id => this.productService.verifyProduct(id).pipe(
            map(exists => exists ? {idAlreadyExists: true} : null)
          )
        )
      );
    }
  }

  dateRange(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const dateRelease = group.get('date_release');
      const dateRevision = group.get('date_revision');
      if (!dateRelease?.value || !dateRevision?.value) return null;

      const releaseDate = new Date(dateRelease.value);
      const revisionDate = new Date(dateRevision.value);
      const today = new Date();

      if (releaseDate > today ) return {dateRange: true};
      if (releaseDate > revisionDate) return {dateRange: true};

      const releasePlusOneYear = new Date(releaseDate);
      releasePlusOneYear.setFullYear(releasePlusOneYear.getFullYear() + 1);

      const sameDay = revisionDate.getDate() === releasePlusOneYear.getDate();
      const sameMonth = revisionDate.getMonth() === releasePlusOneYear.getMonth();
      const sameYear = revisionDate.getFullYear() === releasePlusOneYear.getFullYear();

      if(!(sameDay && sameMonth && sameYear)){
        return {dateRange: true};
      }

      return null;
    }
  }

}
