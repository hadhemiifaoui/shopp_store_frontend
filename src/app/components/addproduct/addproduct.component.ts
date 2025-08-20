import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../types/product';
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
   productForm: FormGroup;
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      categ: [''],
      image: ['']
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: data => {
        this.products = data;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
      }
    });
  }
    
  onSubmit() {
    if (this.productForm.invalid) return;

    this.productService.create(this.productForm.value).subscribe({
      next: newProduct => {
        this.products.push(newProduct);
        this.productForm.reset({ name: '', desc: '', price: 0, categ: '', image: '' });
      },
      error: err => {
        this.errorMessage = 'Failed to save product.';
      }
    });
  }



}
