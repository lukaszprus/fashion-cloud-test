import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(params: any) {
    return this.http.get<Product[]>('/api/products', { params, observe: 'response' });
  }
}
