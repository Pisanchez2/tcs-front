import {Component, input, OnInit, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent implements OnInit {
  placeholder = input('Search...');
  searchChanged = output<string>();

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(200), distinctUntilChanged()).subscribe(
      value => this.searchChanged.emit(value || '')
    )
  }
}
