import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, CategorySize, Size } from 'src/app/models/category-sizes.model';

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

  public categoryExist(label: string){
    return this.http.get(`${this.BASE_URL_CATEGORY}/${label}`)
  }

  public sizeExist(label: string){
    return this.http.get(`${this.BASE_URL_SIZE}/${label}`)
  }

  public saveCategory(category: Category){
    return new Observable( observe=> {
      this.http.post(this.BASE_URL_CATEGORY, category, {headers:{'Content-Type':'application/json'}})
      .subscribe( res=>{
        console.log( res )
        this.mixCategorySize().subscribe(cats => {
          this.categorysSizesSubject.next( cats )
          console.log( '1111' )
          observe.next( true )
        })
      })
    })
  }

  public saveSize(size: Size){
    return new Observable( observe => {
    this.http.post(this.BASE_URL_SIZE, size, {headers:{'Content-Type':'application/json'}})
      .subscribe( res=>{
          this.mixCategorySize().subscribe(res=> {
            this.categorysSizesSubject.next( res )
            observe.next( true )
          })
      })
    })
  }

}
