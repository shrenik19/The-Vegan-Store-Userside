import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sort:string='http://Localhost:3000/sort/';
  private filter:string='http://Localhost:3000/sort/';
  private filtercat:string='http://Localhost:3000/filtercat/';
  private filterrange:string='http://Localhost:3000/filterrange/';
  constructor(private _http:HttpClient) { }
  getallproductINASC()
  {
    return this._http.get(this.sort);
  }
  getallfilterpro(fk_cat_id,range)
  {
    return this._http.get(this.sort+fk_cat_id+"/"+range);
  }
  getallfilterbycat(fk_cat_id)
  {
    return this._http.get(this.filtercat+fk_cat_id);
  }
  getallfilterrange(range)
  {
    return this._http.get(this.filterrange+range);
  }
}
