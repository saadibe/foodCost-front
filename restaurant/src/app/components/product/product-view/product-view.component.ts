import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductForm } from './product.form';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ProductModel } from 'src/app/models/product.model';
import { Category, CategorySize, Size } from 'src/app/models/category-sizes.model';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
import { ChangeDetectorRef } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';

declare var $: any;

//this form is not accesible by url, only by click
//it need permission to be opened the first time, even the user has logged in

@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, AfterViewInit,AfterViewChecked ,OnDestroy {
 
  _$ = $
  //A dirty way to make sure that the original user is making change
  //this field will be replaced with real credentials in next version
  //PWD = admin
  PASSWORD_PASS: string;

  //switch to recipe product
  make_recipe = false


  formAction = FormAction
  product: ProductModel = null;
  action: string;
  productForm: ProductForm;
  categorysSizes = new CategorySize([], []);

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
    this.categorySizeService.categorysSizesSubject.subscribe(res=>{
      this.categorysSizes = (res)?res: new CategorySize([], [])
    })

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
    $(".make-category").remove()
    $(".make-size").remove()
  }

  ngAfterViewInit(): void {
    //init dropdowns categorys and sizes
    this.setSelectedCategorysSizes()
    
    $(".on-action-modal").modal({closable:false})
    $(".on-enter-modal-password").modal({closable: false})
    $(".make-category").modal()
    $(".make-size").modal()
    //need permission to access this form
    this.openVerifCredentials()

  }



  ngOnInit(): void {
  }

  //get image from input file
  onFileChanged(event){
    //get the value
    let selectedFile = event.target.files[0];
    //make a reader
    const fr = new FileReader()
    //set the value
    fr.readAsDataURL( selectedFile )
    fr.onload = () => {
      //setted in the formGroup
      this.productForm.productForm.patchValue({image: fr.result})
      //displayed to user
      document.getElementById("current-image-product")['src'] = fr.result
    }
  }

  //display input file
  showImageFileUpload(){
    //input file is not displayed, it will opened with this way
    document.getElementById("image-file-upload").click()
  }

  //create and update product
  //this function can create or update a product
  save( with_new = false ){
    //show the user that saving is happening
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
    //init dropdown
    $(".dropdown").dropdown()

    //every change in the categorys dropdown will setted in the form
    $("#category-product-dropdown").dropdown({
      onChange: (e)=>{
        let t  = ( e == "" )?[]: e.split(",")
        this.productForm.productForm.patchValue({category: t })
      }
    })
    
    //every change in the sizes dropdown will setted in the form
    $("#size-product-dropdown").dropdown({
      onChange: (e)=>{
        let t  = ( e == "" )?[]: e.split(",")
        this.productForm.productForm.patchValue({size: t })
      }
    })

    //opening recipe part, can make product form losing values
    //categorys and sizes will be resetted from the product, if the form is empty
    let categorys = this.product?.productCategorys.map(e=>e.id.toString())
    let sizes = this.product?.productSizes.map(e=>e.id.toString())

    //otherwise any change has been made, values will be resetted from the form
    let cat2 = this.productForm.getValue('category')?.map(e=>e.toString())
    let siz2 = this.productForm.getValue('size')?.map(e=>e.toString())

    //if they are no value of categorys or sizes in the form, get them from products
    cat2 = (cat2)?cat2:categorys
    siz2 = (siz2)?siz2:sizes

    //set the values in the dropdowns
    $("#category-product-dropdown").dropdown('set selected', cat2)
    $("#size-product-dropdown").dropdown('set selected', siz2)

  }
  
  //remove product
  remove(){
    //show the user that action is happening
    $(".on-action-modal").modal('show')
    //remove the product
    this.productsService.removeProduct( {id: this.product.id} ).subscribe(res=>{
      //hide notification action
    $(".on-action-modal").modal('hide')
    //go back to grid
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

    prd.image = this.productForm.getValue('image')
    prd.actual_price = parseFloat( 
      (prd.price - ((prd.price * prd.discount)/100)).toFixed(2)
    )
    
    prd.recipe = this.productForm.getValue('recipe')
    console.log( prd )
    return prd;
  }

  makeRecipe(event){
    let t = []

    event.forEach( e=>{
      let item = new RecipeModel()
      item.grammes = parseFloat( e.grammes )
      item.ingredient = e.ingredient
      t.push( item )
    })

    this.productForm.productForm.patchValue({recipe: t })
  }

  credentialVerif(){
    let t = (this.PASSWORD_PASS == "admin")
    if( t ){
      $(".on-enter-modal-password").modal('hide')
      localStorage.setItem("action-user-verif", "1")
    }
  }
  openVerifCredentials(){
    //if this form is opened, it will need permission in the first time
    let t = localStorage.getItem("action-user-verif")
    if( !t )
    $(".on-enter-modal-password").modal('show')
  }

  closeRecipePart(){
    this.make_recipe = false

    //after closing recipe, the form lose values
    //dirty way to reset everything, a timeout will be setted
    //after dom will be setted of 50ms, all values will be present
    setTimeout( ()=>{
      this.setSelectedCategorysSizes()
    }, 50)

  }
}
