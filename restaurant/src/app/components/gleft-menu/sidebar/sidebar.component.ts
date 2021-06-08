import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'menu-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    $(".ui.sidebar").sidebar({transition: 'overlay'});
  }

  ngOnInit(): void {
  }

}
