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
  styleUrls: ['./addproduct.component.css'] // <-- fixed typo here: styleUrl -> styleUrls
})
export class AddproductComponent {
  productForm: FormGroup;
  products: Product[] = [];
  isLoading = false;
  errorMessage = '';
  selectedFile: File | null = null; // <-- new property

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      categ: [''],
      image: ['']  // this will be handled via selectedFile
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

  // 🔹 Add this method
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    // Use FormData to send the image
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('desc', this.productForm.get('desc')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categ', this.productForm.get('categ')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.create(formData).subscribe({
      next: newProduct => {
        this.products.push(newProduct);
        this.productForm.reset({ name: '', desc: '', price: 0, categ: '', image: '' });
        this.selectedFile = null;
      },
      error: err => {
        this.errorMessage = 'Failed to save product.';
      }
    });
  }
}
