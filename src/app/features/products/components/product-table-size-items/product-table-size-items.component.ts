import {Component, OnInit, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DEFAULT_PAGE_SIZE} from '../../constants/product-pagination.constants';

@Component({
  selector: 'app-product-table-size-items',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-table-size-items.component.html',
  styleUrl: './product-table-size-items.component.scss'
})
export class ProductTableSizeItemsComponent implements OnInit {
  sizePageChanged = output<number>();

  sizeControl = new FormControl(DEFAULT_PAGE_SIZE);

  ngOnInit(): void {
    this.sizeControl.valueChanges.subscribe((value) => this.sizePageChanged.emit(value || DEFAULT_PAGE_SIZE))
  }

}
