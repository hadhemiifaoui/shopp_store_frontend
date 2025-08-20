import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, map } from "rxjs";

import { Product } from "../types/product";


@Injectable({providedIn : 'root'}) 


export class ProductService {
    private baseUrl = 'http://localhost:8000/api/products/products/'
    
    constructor(private http: HttpClient) {
    
    }

  
   getAll(): Observable<Product[]> {
  return this.http.get<Product[]>(this.baseUrl);
}

getById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.baseUrl}${id}`);
}




   //create a new product
   create(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, productData);
  }


   //update a product

   update(id : number , data : Partial<Product>) : Observable<any>  {
    return this.http.put(`${this.baseUrl}${id}`, data)
   }


   //remove a product 


   delete(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`)
   }


}