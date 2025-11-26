import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productApiUrl = '/api/bp/products'

  constructor(private readonly http: HttpClient) {
  }

  getProducts(): Observable<{ data: IProduct[] }> {
    return this.http.get<{ data: IProduct[] }>(`${this.productApiUrl}`);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.productApiUrl}`, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.productApiUrl}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.productApiUrl}/${id}`);
  }

  verifyProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.productApiUrl}/verification/${id}`);
  }

}
