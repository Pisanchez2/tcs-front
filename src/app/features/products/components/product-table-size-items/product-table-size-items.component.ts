import { Component, OnInit, OnDestroy, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from '../../constants/product-pagination.constants';

@Component({
  selector: 'app-product-table-size-items',
  imports: [ReactiveFormsModule],
  templateUrl: './product-table-size-items.component.html',
  styleUrl: './product-table-size-items.component.scss'
})
export class ProductTableSizeItemsComponent implements OnInit, OnDestroy {
  sizePageChanged = output<number>();

  sizeControl = new FormControl(DEFAULT_PAGE_SIZE);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.sizeControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.sizePageChanged.emit(value || DEFAULT_PAGE_SIZE);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
