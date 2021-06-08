import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DragItem, onChooseProduct, onRejectProduct, RemovedItem } from './item.dragdrop.actions';
declare var $: any;
@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit, AfterViewInit, OnDestroy {
  product = [];
  isDragged = false
  price: number = 0
  productType: any = null;
  @ViewChildren('GRAMMAGES') GRAMMAGES!: QueryList<ElementRef>;

  constructor() {
    //notify if element is removed from product
    RemovedItem.subscribe(res=>{
      if( res == null )return
      this.product = this.product.filter(e=> e.id != res.id)
      this.calcPrice() 
    })

    //on product has been choosed
    onChooseProduct.subscribe(productType => {
      this.productType = productType
    })

    //if on drag event
    DragItem.subscribe(res=> { this.isDragged = res })
  }


  ngOnDestroy(): void {
    //clear all data
    onChooseProduct.next(null);
  }



  ngAfterViewInit(): void {
    $(".convert-price").popup()
  }

  ngOnInit(): void {
  }

  //product has been projected, everything will reset
  rejectProduct(){
    this.productType = null
    onRejectProduct.next(false)
    this.price = 0
    this.product = []
  }

  //toggle the bar on responsive mode
  showBottomSideBar(){
    $("#ELEMENTS-CONSTRUCT-8569-BOTTOM").sidebar('toggle')
  }


  //element grammes is changed, price will be resetted
  setPrice(id, event){
    this.GRAMMAGES.forEach( (item)=>{
      if( item.nativeElement.value === "" )
      item.nativeElement.value = "0"
    })

    let gramme = event.target.value
    this.product.map(e=>{
      if( e.id == id ){
        e.gramme = parseFloat(gramme)
      }
    })
    this.calcPrice()
  }

  //gramme length should be less than 6
  controlLength(id, event){
    let gramme = event.target.value
    if( event.key =="e" || gramme && gramme.length > 5 && event.key != "Backspace")
    event.preventDefault()
  }

  //calc the final price
  calcPrice(){
    this.price = 0
    this.product.map( e=>{
      this.price =  this.price + (e.gramme *  e.gramme_price  )
      this.price = parseFloat( this.price.toFixed(2) )
    })
  }

  //element is dropped
  onDrop(event: CdkDragDrop<any>){

    //set the element in the new container
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
      //calc the price
      let t = event.container.data
      t.forEach( e=> {
        let has = this.product.filter( i=> i.id == e.id )
        if( has.length == 0 )this.product.push(has[0])
      })
      this.isDragged = false
      this.calcPrice()
    }
  }
}
