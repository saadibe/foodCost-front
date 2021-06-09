import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/product/products/products.component';
import { FiltersProductComponent } from './components/product/filters-product/filters-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductViewComponent } from './components/product/product-view/product-view.component';
import { ElementsComponent } from './components/element/elements/elements.component';
import { ConstructionComponent } from './components/construct/construction/construction.component';
import { BarconstructorComponent } from './components/construct/barconstructor/barconstructor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BottomMenuBarComponent } from './components/construct/bottom-menu-bar/bottom-menu-bar.component';
import { ElementsFilterComponent } from './components/element/elements-filter/elements-filter.component';
import { FormViewElementsComponent } from './components/element/form-view-elements/form-view-elements.component';
import { ActivateConsoleGuard } from './guards/console-activator/activate-console.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalLeftMenuComponent } from './components/gleft-menu/global-left-menu/global-left-menu.component';
import { SidebarComponent } from './components/gleft-menu/sidebar/sidebar.component';
import { TippydDirective } from './directives/TippyDirective/tippyd.directive';
import { ProductsGridComponent } from './components/product/products-grid/products-grid.component';
import { ElementsGridComponent } from './components/element/elements-grid/elements-grid.component';
import { FormActivatorGuard } from './guards/pe-form-activator/form-activator.guard';
import { HttpClientModule } from '@angular/common/http';
import { DefaultProductImagePipe } from './pipes/defaultProductImage/default-product-image.pipe';
import { RecipeComponent } from './components/recipe/recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavbarComponent,
    LoginComponent,
    GlobalLeftMenuComponent,
    ProductsComponent,
    FiltersProductComponent,
    ProductViewComponent,
    SidebarComponent,
    ElementsComponent,
    ConstructionComponent,
    BarconstructorComponent,
    BottomMenuBarComponent,
    ElementsFilterComponent,
    FormViewElementsComponent,
    TippydDirective,
    ProductsGridComponent,
    ElementsGridComponent,
    DefaultProductImagePipe,
    RecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ActivateConsoleGuard, FormActivatorGuard],
  bootstrap: [AppComponent, SidebarComponent, BottomMenuBarComponent]
})
export class AppModule { }
