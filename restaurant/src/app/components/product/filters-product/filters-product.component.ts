import { Component, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
declare var $: any;
@Component({
  selector: 'field-filters-product',
  templateUrl: './filters-product.component.html',
  styleUrls: ['./filters-product.component.scss']
})
export class FiltersProductComponent implements OnInit, AfterViewInit, OnDestroy {
  isBetween = {
    price: false,
    actual: false,
    discount: false,
    saled: false
  }
  constructor() { }
  ngOnDestroy(): void {
    $("#filters-product-789-modal").remove()
  }
 

  ngAfterViewInit(): void {
    initJqueryElements()
    $(".fdropdown-pr-7").dropdown({
      onChange: ( value )=>{this.isBetween[value.split(":")[0]] = (value.split(":")[1] == 'between')}
    })
  }

  ngOnInit(): void {
  }

  showFilterModal(){
    $("#filters-product-789-modal").modal('show')
  }
}



/*------init jquery elements--------*/
function initJqueryElements(){
  $(".filters-dropdown").popup({on: 'click'})
  $("#filters-product-789-modal").modal()
  $(".dropdown").dropdown()
}