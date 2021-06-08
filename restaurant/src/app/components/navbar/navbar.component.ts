import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  actual_route = "products"
  constructor(private router: Router) { 
    this.router.events.subscribe( val => {
      (val instanceof NavigationEnd)?this.actual_route = val.urlAfterRedirects: "products" 
    })
  }


  ngAfterViewInit(): void {
    $(".itemnavbar-88").click( function(){
      $(".itemnavbar-88").removeClass('current')
      $(this).addClass('current')
    })
  }

  ngOnInit(): void {
  }

  isCurrent( comp ){
    return {'current': this.actual_route.indexOf( comp ) != -1}
  }

  toggleSidebar(){
    $("#global-sidebar-GS01").sidebar('toggle')
  }

}
