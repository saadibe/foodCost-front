import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ElementModel } from 'src/app/models/elements.model';
import { ElementsService } from 'src/app/services/elements/elements.service';
import { Ingredient, RecipeElement } from './recipe.element';
declare var $: any;
@Component({
  selector: 'make-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('SCROLLER') SCROLLER: ElementRef;
  @Output() close = new EventEmitter()
  @Output() onRecipe = new EventEmitter();
  @Input() old_recipe: Array<RecipeElement>;
  @Input() ignore: Array<number>;

  @Input() recipe_elements: Array<RecipeElement> = [];

  elementsSource = []
  element_count = 0

  constructor(public elementService: ElementsService) { 
    this.elementService.fetchElements().subscribe(elements=> {
      if( this.ignore )
        this.elementsSource = elements.filter(e=> !this.ignore.includes(e.id) )
      else
        this.elementsSource = elements
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.recipe_elements = this.recipe_elements.sort( (a,b)=>a.id - b.id)
    this.recipe_elements.map( e=>{
      e.id = this.element_count++
      return e
    })
  }
  
  ngAfterViewInit(): void {
    this.onChangeDropdown()
  
    $(".recipe-dropdown").each( function(i){
      let t = $(this).attr('in')
      
      setTimeout( ()=>{$(this).dropdown('set selected', t)}, 100)
    })
    
    for(let cmp = 0; cmp < this.recipe_elements.length ;cmp++){
      let t = this.element_count
      let t1 = this.recipe_elements[cmp]
      this.element_count = (t1.id > t)?t1.id:t
    }
    this.element_count++
    this.SCROLLER.nativeElement.scrollTop = this.SCROLLER.nativeElement.scrollHeight;

  }

  ngOnInit(): void {
  }

  closeRecipe(with_res = true){
    if( with_res ){
      let final_recipe = this.recipe_elements.filter(e=>e.grammes != 0)
      this.onRecipe.emit( final_recipe )
    }
    this.close.emit(false)
  }

  onChangeDropdown(){

    $(".recipe-dropdown").dropdown({
      onChange:( val )=>{
        let t = val.split(":").map(e=>parseInt(e))
        let element = this.elementsSource.filter(e=> e.id == t[0])[0]
        this.recipe_elements.map(e=> {
          e.ingredient = (e.id == t[1])?{id: element.id, name: element.name}: e.ingredient
          return e
        })
        console.log( this.recipe_elements )
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
        e.grammes = event.target.value
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
