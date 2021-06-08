import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConstructionComponent } from './components/construct/construction/construction.component';
import { ElementsComponent } from './components/element/elements/elements.component';
import { ProductsComponent } from './components/product/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ActivateConsoleGuard } from './guards/console-activator/activate-console.guard';
import { ProductsGridComponent } from './components/product/products-grid/products-grid.component';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ElementsGridComponent } from './components/element/elements-grid/elements-grid.component';
import { FormViewElementsComponent } from './components/element/form-view-elements/form-view-elements.component';
import { FormActivatorGuard } from './guards/pe-form-activator/form-activator.guard';

const routes: Routes = [
  {path: '', redirectTo: 'accueil', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

  {path: 'accueil', component: AccueilComponent, canActivate:[ActivateConsoleGuard], children:[
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    
    { path: 'products', component: ProductsComponent, children:[
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: ProductsGridComponent},
      {path: 'form', component: ProductViewComponent, canActivate:[FormActivatorGuard]}
    ]},

    { path: 'elements', component: ElementsComponent, children:[
      {path: '', redirectTo:'list', pathMatch:'full'},
      {path: 'list', component: ElementsGridComponent},
      {path: 'form', component: FormViewElementsComponent, canActivate:[FormActivatorGuard]}
    ]},

    { path: 'construction', component: ConstructionComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
