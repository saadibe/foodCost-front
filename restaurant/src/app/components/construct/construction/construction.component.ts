import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ConstructionItem, ConstructionModel } from 'src/app/models/construction.model';
import { DragItem, emptyElementsLoad, emptyProductsLoad, onChooseProduct, onRejectProduct, RemovedItem } from './item.dragdrop.actions';
declare var $: any;
@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss']
})
export class ConstructionComponent implements OnInit, AfterViewInit, OnDestroy {
  productEmptyList = false
  elementsEmptyList = false
  product = [];
  isDragged = false
  price: number = 0
  productType: any = null;

  setting_new_product = true
  //result to get all constructions and make facture 
  product_ordered_list = []

  @ViewChildren('GRAMMAGES') GRAMMAGES!: QueryList<ElementRef>;

  constructor() {
    //reste en écoute si les produits ou les éléments n'existe pas
    emptyProductsLoad.subscribe(res => this.productEmptyList = res)
    emptyElementsLoad.subscribe(res => this.elementsEmptyList = res )

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
    $(".construction-continue-modal").remove()
    $(".construction-facturation-modal").remove()
  }



  ngAfterViewInit(): void {
    $(".construction-continue-modal").modal()
    $(".construction-facturation-modal").modal()
  }

  ngOnInit(): void {
  }

  //product has been projected, everything will reset
  rejectProduct( emptyAll = false){
    this.productType = null
    onRejectProduct.next(false)
    this.price = 0
    this.product = []
    this.setting_new_product = true
    if( emptyAll )
    this.product_ordered_list = []
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
      this.price =  this.price + parseFloat( (e.gramme *  e.gramme_price).toFixed(2)  )
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


  confirmProduct(){
    let t = this.makeProduct()
    if( this.setting_new_product ){
      this.product_ordered_list.push( t )
      this.setting_new_product = false
    }
    else
      this.product_ordered_list[ this.product_ordered_list.length - 1 ] = t

    $(".construction-continue-modal").modal('show')
    console.log( t )
  }
  
  countConfirmedItems(){
    return this.product_ordered_list.filter(e=>e.confirmed).length
  }
  getConfirmedItems(){
    return this.product_ordered_list.filter(e=>e.confirmed)
  }

  makeProduct(){
    let item = new ConstructionModel()
    item.label = Math.random().toString(36).substring(7)
    item.discount = Math.floor(Math.random() * 25)
    item.qrcode = "UNDEFINED"
    item.final_price = this.price

    this.product.forEach( e=>{
      item.customRecipes.push(
        new ConstructionItem(e.gramme, e.gramme_price, {id: e.id, name: e.name}, {
          id: this.productType.id,
          name: this.productType.name,
          image: this.productType.image
        })
      )
    })
    return item
  }

  addAndNew(){
    this.product_ordered_list[this.product_ordered_list.length - 1].confirmed = true
    $(".construction-continue-modal").modal('hide')
    this.rejectProduct()
  }

  cartInvoice(){
    $(".construction-facturation-modal").modal('show')
  }

  parseForPrintGrammePrice(x, y){
    return parseFloat( (x*y).toFixed(2) )
  }

  calcFinalPrice(){
    let final_price = 0
    this.product_ordered_list.forEach(e=>{
      final_price += e.final_price
    })
    return final_price
  }

}
