import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementsService } from 'src/app/services/elements/elements.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { DragItem, emptyElementsLoad, emptyProductsLoad, onChooseProduct, onRejectProduct, RemovedItem } from '../construction/item.dragdrop.actions';
declare var $: any;
@Component({
  selector: 'construct-bottom-menu-bar',
  templateUrl: './bottom-menu-bar.component.html',
  styleUrls: ['./bottom-menu-bar.component.scss']
})
export class BottomMenuBarComponent implements OnInit, AfterViewInit {
  elements = []
  productHasChoosed = false
  products = []
  constructor(private elementsService: ElementsService, private productsService: ProductsService) {
    
    //get all products
    this.productsService.fetchProducts().subscribe( products=> {
      //informer le parent si ya pas des produits
      emptyProductsLoad.next( products.length == 0)
      this.products = products
    })
    
    //get all elements
    this.elementsService.fetchElements().subscribe( elements=>{
      //informer le parent si ya pas des éléments
      emptyElementsLoad.next( elements.length == 0)
      this.elements = elements.map(e=>{
      //set every element with default gramme = 10
      e['gramme'] = 10
      return e
    })})
    
    //notify on product rejected, than reset
    onRejectProduct.subscribe(res=> {
      this.productHasChoosed = res
      this.elementsService.fetchElements().subscribe( elements=> this.elements = elements.map(e=>{
        e['gramme'] = 10
        return e
      }))
    })
  }
  
  ngAfterViewInit(): void {
    //setting sidebar on responsive size
    $('.bottom.sidebar').sidebar('setting', 'transition', 'overlay')
    $('.bottom.sidebar').sidebar('setting', 'dimPage', false);
  }

  //on product choosed
  onGotProduct( item ){
    this.productHasChoosed = true
    onChooseProduct.next( item )
  }

  ngOnInit(): void {
  }

  //on element dropped
  onDrop(event: CdkDragDrop<any>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    //notify the removed element
    RemovedItem.next( event.container.data[event.currentIndex] )
  }

  //notify with drag event start
  onDrag(e){
    DragItem.next(e)
  }

}
