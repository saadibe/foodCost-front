import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'elements-filter',
  templateUrl: './elements-filter.component.html',
  styleUrls: ['./elements-filter.component.scss']
})
export class ElementsFilterComponent implements OnInit, OnDestroy, AfterViewInit {
  isBetween = {
    price: false,
    price_kg: false
  }
  constructor() { }

  ngOnDestroy(): void {
    $("#filters-elements-789-modal").remove()
  }
 

  ngAfterViewInit(): void {
    initJqueryElements()
    $(".fdropdown-pr-71").dropdown({
      onChange: ( value )=>{this.isBetween[value.split(":")[0]] = (value.split(":")[1] == 'between')}
    })
  }

  ngOnInit(): void {
  }

  showFilterModal(){
    $("#filters-elements-789-modal").modal('show')
  }
}









/*--------JQUERY INIT FNS----------*/

function initJqueryElements(){
  $(".filters-dropdown").popup({on: 'click'})
  $("#filters-elements-789-modal").modal()
  $(".dropdown").dropdown()
}