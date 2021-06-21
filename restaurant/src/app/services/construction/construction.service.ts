import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstructionModel } from 'src/app/models/construction.model';
import { InvoiceConstruction } from 'src/app/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {
  private readonly BASE_URL = "http://localhost:4300/construction"

  constructor(private http: HttpClient) { }

  public findAll(){
    return this.http.get< Array<ConstructionModel> >( this.BASE_URL );
  }


  public create( invoiceConstruction: InvoiceConstruction ){
    return this.http.post<ConstructionModel>( `${this.BASE_URL}/as-invoice`, invoiceConstruction, {headers:{'Content-Type':'application/json'}} )
  }

}
