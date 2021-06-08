import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CategorySize } from 'src/app/models/category-sizes.model';

@Injectable({
  providedIn: 'root'
})
export class CategorySizeService {

  private readonly BASE_URL_MIX = "http://localhost:4300/category-size/mix"
  private readonly BASE_URL_CATEGORY = "http://localhost:4300/category-size/category"
  private readonly BASE_URL_SIZE = "http://localhost:4300/category-size/size"
  public categorysSizesSubject = new BehaviorSubject<CategorySize>(null);

  constructor(private http: HttpClient) { 
    this.mixCategorySize().subscribe(res=> this.categorysSizesSubject.next( res ))
  }

  public mixCategorySize(){
    return this.http.get<CategorySize>(this.BASE_URL_MIX)
  }
}
