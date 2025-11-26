import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../models/product.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API_URL = '/api/bp/products';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<{ data: IProduct[] }> {
    return this.http.get<{ data: IProduct[] }>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.API_URL, product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(
      `${this.API_URL}/${product.id}`,
      product
    ).pipe(catchError(this.handleError));
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  verifyProduct(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/verification/${id}`)
      .pipe(catchError(() => throwError(() => ({ exists: false }))));
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => error);
  }
}
