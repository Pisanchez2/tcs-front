import {computed, Injectable, signal} from '@angular/core';
import {IProduct} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private readonly _productToEdit = signal<IProduct | null>(null);
  private readonly _productWasDeleted = signal(false);

  productToEdit = computed(()=> this._productToEdit());
  productWasDeleted = computed(()=> this._productWasDeleted());

  setProductToEdit(product:IProduct | null){
    this._productToEdit.set(product);
  }

  setProductWasDeleted(deleted:boolean){
    this._productWasDeleted.set(deleted);
  }

  clearProductToEdit(){
    this._productToEdit.set(null);
  }

}
