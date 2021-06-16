import { DragItem, emptyElementsLoad, emptyProductsLoad, onChooseProduct, onRejectProduct } from '../construction/item.dragdrop.actions';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RemovedItem } from '../construction/item.dragdrop.actions';
import { ProductsService } from 'src/app/services/products/products.service';
import { ElementsService } from 'src/app/services/elements/elements.service';

@Component({
  selector: 'construction-barconstructor',
  templateUrl: './barconstructor.component.html',
  styleUrls: ['./barconstructor.component.scss']
})
export class BarconstructorComponent implements OnInit {
  
  productHasChoosed = false

  products = []
  elements = []
  constructor(private productsService: ProductsService, private elementsService: ElementsService) { 
    //get all products
    this.productsService.fetchProducts().subscribe( products=> {
      this.products = products
      //informer le parent si ya pas des produits
      emptyProductsLoad.next( products.length == 0 )
    })
    //get all elements
    this.elementsService.fetchElements().subscribe( elements=>{
      emptyElementsLoad.next( elements.length == 0)
      this.elements = elements.map(e=>{
      //set the default gramme of every element = 10
      e['gramme'] = 10
      return e
    })})
    
    //on product rejected, reset
    onRejectProduct.subscribe(res=> {
      this.productHasChoosed = res
      this.elementsService.fetchElements().subscribe( elements=>
        this.elements = elements.map(e=>{
          e['gramme'] = 10
          return e
        })
      )
    })
    
  }
    
  

  ngOnInit(): void {
  }

  //product has been choosed
  onGotProduct( item ){
    this.productHasChoosed = true
    onChooseProduct.next( item )
  }

  //element has been dropped
  onDrop(event: CdkDragDrop<any>){
    //set the element in the new container
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    //notify with the dropped element
    RemovedItem.next( event.container.data[event.currentIndex] )
  }

  //on drag, notify
  onDrag(e){
    DragItem.next(e)
  }
}
