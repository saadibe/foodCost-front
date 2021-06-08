import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products = new Array<ProductModel>()

  private readonly BASE_URL = "http://localhost:4300/products"

  constructor(private http: HttpClient) {
  }

  createProduct(product: ProductModel){
    return this.http.post<ProductModel>(this.BASE_URL, product, {headers:{'Content-Type':'application/json'}})
  }

  fetchProducts(){
    return this.http.get< Array<ProductModel> >(this.BASE_URL)
  }

  removeProduct(product: any){
    return this.http.delete(this.BASE_URL, {params: product })
  }

  updateProduct(product: ProductModel){
    return this.http.put(this.BASE_URL, product, {headers:{'Content-Type':'application/json'}})
  }

}
