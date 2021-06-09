import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ElementModel } from 'src/app/models/elements.model';
import { RecipeElement } from './recipe.element';
declare var $: any;
@Component({
  selector: 'make-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  @ViewChild('SCROLLER') SCROLLER: ElementRef;
  @Output() close = new EventEmitter()
  elementsSource = [
    {id: 1, name: 'e1', image: ''},
    {id: 2, name: 'e2', image: ''},
    {id: 3, name: 'e3', image: ''},
    {id: 4, name: 'e4', image: ''},
    {id: 5, name: 'e5', image: ''},
  ]
  recipe_elements: Array<RecipeElement> = [];

  element_count = 0

  constructor() { }

  ngOnInit(): void {
  }

  closeRecipe(){
    this.close.emit(false)
  }

  onChangeDropdown(){

    $(".recipe-dropdown").dropdown({
      onChange:( val )=>{
        let t = val.split(":").map(e=>parseInt(e))
        let element = this.elementsSource.filter(e=> e.id == t[0])[0]
        this.recipe_elements.map(e=> {
          e.element = (e.id == t[1])?element: e.element
          return e
        })
      }
    })
  }

  addNew(){
    this.element_count++
    this.recipe_elements.push( new RecipeElement(this.element_count) )
    this.SCROLLER.nativeElement.scrollTop = this.SCROLLER.nativeElement.scrollHeight;
    setTimeout( ()=>{ this.onChangeDropdown() }, 50 ) 
  }

  setGramme(event, id){
    this.recipe_elements.map(e=>{
      if( e.id == id){
        e.gramme = event.target.value
      }
    })
  }

  removeElement( id ){
    this.recipe_elements = this.recipe_elements.filter(e=> e.id != id)
  }

  annuler(){
    this.recipe_elements = []
  }

  validate(e){
    if( e.key == 'e' || e.key == '.' )
    e.preventDefault()
  }
}
