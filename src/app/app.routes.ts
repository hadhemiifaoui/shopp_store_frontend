/*import { NgModule } from '@angular/core';

import { RouterModule , Routes } from '@angular/router';*/
import {Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'about', component: AboutComponent },
    { path: 'add', component: AddproductComponent },
// { path: '**', redirectTo: '/home' }  
];




/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }*/