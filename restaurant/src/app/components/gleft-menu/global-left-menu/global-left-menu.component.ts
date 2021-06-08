import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'global-left-menu',
  templateUrl: './global-left-menu.component.html',
  styleUrls: ['./global-left-menu.component.scss']
})
export class GlobalLeftMenuComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
