import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElementModel } from 'src/app/models/elements.model';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private readonly BASE_URL = "http://localhost:4300/elements"

  constructor(private http: HttpClient) {
  }

  fetchElements(){
    return this.http.get< Array<ElementModel> >(this.BASE_URL)
  }

  createElement(element: ElementModel){
    return this.http.post(this.BASE_URL, element, {headers:{'Content-Type':'application/json'}})
  }

  updateElement(element: ElementModel){
    return this.http.put(this.BASE_URL, element, {headers:{'Content-Type':'application/json'}})
  }
  removeElement(element: any){
    return this.http.delete(this.BASE_URL, {params: element })
  }

}
