import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
declare var $: any;
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, AfterViewInit {
  actual_route = ""

  constructor(private router: Router, private categorySizeService: CategorySizeService) {
    this.router.events.subscribe( val => (val instanceof NavigationEnd)?this.actual_route = val.url: "" )
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  actualRoute( comp ){
    return this.actual_route.indexOf( comp ) != -1
  }
}
