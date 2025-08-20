import { Component , OnInit, ViewEncapsulation } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {AddproductComponent} from '../addproduct/addproduct.component'
import { ProductcardComponent } from '../productcard/productcard.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule, RouterLink, ProductcardComponent, AddproductComponent ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] ,
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent {
   products : Product[] = [];
   isLoading = false;
   errorMessage : string | null = null;
   

   constructor(private productService : ProductService) {}

   ngOnInit() : void {
    this.loadProducts();
   }


   loadProducts() : void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next : (data) => {
        this.products = data;
        this.isLoading = false
      },
      error : (e) =>{
        this.errorMessage = 'Failed  to load products'
        this.isLoading = false;
        console.error(e)
      }
    })    
   }


   deleteProduct(id : number): void {
     if(confirm('Are you sure you wanna delete this product?')){
      this.productService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error : (e) => {
          this.errorMessage = "Failed to delete product"
          console.error(e)
        }
      })
    
    }
   }
}



