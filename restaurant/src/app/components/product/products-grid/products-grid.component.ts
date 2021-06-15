import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridActionControl } from 'src/app/libs/grid.actions.control';
import { ObjectFilter, TypeActionField } from 'src/app/libs/object-filter';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ProductsService } from 'src/app/services/products/products.service';
import { HEADERS } from '../products-grid.headers';

@Component({
  selector: 'products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.scss']
})
export class ProductsGridComponent implements OnInit, AfterViewInit {

  gridControls: GridActionControl;
  formAction = FormAction
  objectFilter = new ObjectFilter([], ['image', 'recipe'])
  canExport = false
  products = []
  products_tips = []
  products_loaded = false

  constructor(private router: Router, private acrouter: ActivatedRoute, private productsService: ProductsService) { 
    //make the grid controls with associated headers
    this.gridControls = new GridActionControl(HEADERS);

    //get all products
    this.productsService.fetchProducts().subscribe(products => {
      this.products = products
      this.products_tips = products
      this.products_loaded = true
      //init object filter
      this.objectFilter.data = [...products].map( e=> {
        if( e.total_stock == 0)e['ts'] = 'indisponible'
        else if( e.total_stock == -1) e['ts'] = 'pas de reçette'
        else if( e.total_stock == 100) e['ts'] = 'disponible'
        else if( e.total_stock < 100 ) e['ts'] = 'manque'
        return e
      })
    })

  }

  ngAfterViewInit(): void {
    this.makeActionOnGrid()
  }

  ngOnInit(): void {
  }

  //global search in grid
  search_global_products(event){
    this.products = this.objectFilter.searchGlobally(event.target.textContent)
  }

  //apply sort and selection on grid
  makeActionOnGrid(){
    this.gridControls.actions.subscribe(res=>{
      if( res == null )return
      if( res.type == TypeActionField.SELECT){
        this.canExport = res.keys.length > 0
        return
      }
      let t = this.objectFilter.sortList(res)
      this.products = (t)?t:this.products
    })
  }
  
  //on edit product item
  editProduct( product_id ){
    let item_edit = this.products.filter( e=> e.id == product_id )[0]
    this.router.navigate(['form'], {
      relativeTo: this.acrouter.parent,
      queryParams:{action: FormAction.EDIT, product: btoa(JSON.stringify(item_edit))}
    })
  } 

  //set hover style on column
  selectColumn(e){
    let t = document.getElementsByClassName(e)
    for(let c = 0; c < t.length; c++){
      t[c].classList.add('hovered-td-header')
    }
  }
  
  //unset hover style on column
  unselectColumn(e){
    let t = document.getElementsByClassName(e)
    for(let c = 0; c < t.length; c++){
      t[c].classList.remove('hovered-td-header')
    }
  }

}
