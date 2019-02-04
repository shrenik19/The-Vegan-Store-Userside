import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { product_class } from '../Classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product:string='http://Localhost:3000/product/';
  constructor(private _http:HttpClient) { }
  getAllproduct(){
    return this._http.get(this.product);
  }
  getAllproById(p_id)
  {
    console.log(p_id);
    return this._http.get(this.product+p_id)
  }
}