import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductForm } from './product.form';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ProductModel } from 'src/app/models/product.model';
import { CategorySize } from 'src/app/models/category-sizes.model';
import { BehaviorSubject } from 'rxjs';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
import { ChangeDetectorRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, AfterViewInit,AfterViewChecked ,OnDestroy {
 
  //A dirty way to make sure that the original user is making change
  //this field will be replaced with real credentials in next version
  //PWD = admin
  PASSWORD_PASS: string;


  formAction = FormAction
  product: ProductModel = null;
  action: string;
  productForm: ProductForm;
  categorysSizes = new CategorySize([], []);
  onLoadCategorysSizes = new BehaviorSubject( false );

  constructor(private router: Router,
    private cdRef:ChangeDetectorRef,
    private acrouter: ActivatedRoute,
    private productsService: ProductsService,
    private categorySizeService: CategorySizeService) {

    //get action mode and item from url
    this.acrouter.queryParams.subscribe(params=>{
      this.action = params['action']

      if( params['product'] != null )
      this.product = JSON.parse( atob(params['product']) )
      this.productForm = new ProductForm( this.product )
    })

    //fetch categorys and sizes from subject
    this.categorySizeService.categorysSizesSubject.subscribe(res=>this.categorysSizes = res)

  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
  
  ngOnDestroy(): void {
    //remove modal
    $(".on-action-modal").modal('hide')
    $(".on-enter-modal-password").modal('hide')
    $(".on-action-modal").remove()
    $(".on-enter-modal-password").remove()
  }

  ngAfterViewInit(): void {
    
    //apply dropdown changes in form product
    $(".dropdown").dropdown()
    
    $("#category-product-dropdown").dropdown({
      onChange: (e)=>this.productForm.productForm.patchValue({category: e.split(",").map(e=>parseInt(e) )})
    })
    
    $("#size-product-dropdown").dropdown({
      onChange: (e)=>this.productForm.productForm.patchValue({size: e.split(",").map(e=>parseInt(e)) })
    })

    this.setSelectedCategorysSizes()
    
    $(".on-action-modal").modal({closable:false})
    $(".on-enter-modal-password").modal({closable: false})
    this.openVerifCredentials()

  }

  ngOnInit(): void {
  }

  //get image from input file
  onFileChanged(event){
    let selectedFile = event.target.files[0];
    const fr = new FileReader()
    fr.readAsDataURL( selectedFile )
    fr.onload = () => {
      this.productForm.productForm.patchValue({image: fr.result})
      document.getElementById("current-image-product")['src'] = fr.result
    }
  }

  //display input file
  showImageFileUpload(){
    document.getElementById("image-file-upload").click()
  }

  //create and update product
  save( with_new = false ){
    $(".on-action-modal").modal('show')
    if( this.action == FormAction.CREATE){
      this.productsService.createProduct( this.makeProduct() ).subscribe(res=>{
        $(".on-action-modal").modal('hide')
        //create one product
        if( !with_new )
          this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
          //create multiple product
        else{
          this.product = null
          this.productForm = new ProductForm(null)
        }
      })
    }
    else{
      //update product
      let product_up = this.makeProduct()
      product_up.id = this.product.id
      this.productsService.updateProduct( product_up ).subscribe(res=>{
        $(".on-action-modal").modal('hide')
        this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
      })
    }
  }

  //update selected categorys on mode EDIT form
  setSelectedCategorysSizes(){
    let categorys = this.product?.productCategorys.map(e=>e.id.toString())
    let sizes = this.product?.productSizes.map(e=>e.id.toString())
    $("#category-product-dropdown").dropdown('set selected', categorys)
    $("#size-product-dropdown").dropdown('set selected', sizes)
  }
  
  //remove product
  remove(){
    $(".on-action-modal").modal('show')
    this.productsService.removeProduct( {id: this.product.id} ).subscribe(res=>{
    $(".on-action-modal").modal('hide')
      this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
    })
  }

  //create product instance
  makeProduct(): ProductModel{
    let prd = new ProductModel();
    prd.name = this.productForm.getValue('name')
    prd.price = this.productForm.getValue('price')

    prd.discount = this.productForm.getValue('discount')
    prd.type = this.productForm.getValue('type')
    prd.description = this.productForm.getValue('description')

    prd.productCategorys = this.productForm.getValue('category')
    .map(e=>this.categorysSizes.categorys.filter(ct=> ct.id == e)[0])

    prd.productSizes = this.productForm.getValue('size')
    .map(e=>this.categorysSizes.sizes.filter(ct=> ct.id == e)[0])

    prd.total_stock = this.productForm.getValue('stock')
    prd.image = this.productForm.getValue('image')
    prd.actual_price = parseFloat( 
      (prd.price - ((prd.price * prd.discount)/100)).toFixed(2)
    )
    return prd;
  }

  credentialVerif(){
    let t = (this.PASSWORD_PASS == "admin")
    if( t ){
      $(".on-enter-modal-password").modal('hide')
      localStorage.setItem("action-user-verif", "1")
    }
  }
  openVerifCredentials(){
    let t = localStorage.getItem("action-user-verif")
    if( !t )
    $(".on-enter-modal-password").modal('show')
  }
}
