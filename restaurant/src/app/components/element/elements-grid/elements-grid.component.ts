import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridActionControl } from 'src/app/libs/grid.actions.control';
import { ObjectFilter, TypeActionField } from 'src/app/libs/object-filter';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ElementsService } from 'src/app/services/elements/elements.service';
import { HEADERS } from '../elements-grid.headers';

@Component({
  selector: 'elements-grid',
  templateUrl: './elements-grid.component.html',
  styleUrls: ['./elements-grid.component.scss']
})
export class ElementsGridComponent implements OnInit, AfterViewInit {

  objectFilter = new ObjectFilter([], ['image', 'recipe'])
  formAction = FormAction
  canExport = false
  elements = []
  gridControls: GridActionControl;
  elements_loaded = false

  constructor(private router: Router,
    private acrouter: ActivatedRoute,
    private elementsService: ElementsService) { 

      //set grid controls with associated headers
    this.gridControls = new GridActionControl(HEADERS)

    //get all elements
    this.elementsService.fetchElements().subscribe(res=>{
      this.elements = res
      this.objectFilter.data = [...res]
      this.elements_loaded = true
      console.log( this.elements )
    })

  }
  
  ngAfterViewInit(): void {
    this.makeActionOnGrid()
  }

  ngOnInit(): void {
  }

  //on edit item
  editElement( element_id ){
    let item_edit = this.elements.filter(e=> e.id == element_id )[0]
    this.router.navigate(['form'], {
      relativeTo: this.acrouter.parent,
      queryParams:{action: FormAction.EDIT, element: btoa(JSON.stringify(item_edit))}
    })
  }

  //search globally in grid
  search_global_elements(event){
    this.elements = this.objectFilter.searchGlobally(event.target.textContent)
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
      this.elements = (t)?t:this.elements
      console.log( this.elements )
    })
  }
  
  //hover style column
  selectColumn(e){
    let t = document.getElementsByClassName(e)
    for(let c = 0; c < t.length; c++){
      t[c].classList.add('hovered-td-header')
    }
  }

  //hover style column
  unselectColumn(e){
    let t = document.getElementsByClassName(e)
    for(let c = 0; c < t.length; c++){
      t[c].classList.remove('hovered-td-header')
    }
  }

}
