import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ElementModel } from 'src/app/models/elements.model';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
import { ElementsService } from 'src/app/services/elements/elements.service';
import { ElementForm } from './element.form';
import { ChangeDetectorRef } from '@angular/core';
import { Category } from 'src/app/models/category-sizes.model';
import { RecipeModel } from 'src/app/models/recipe.model';


declare var $: any;


//this form is not accesible by url, only by click
//it need permission to be opened the first time, even the user has logged in


@Component({
  selector: 'form-view-elements',
  templateUrl: './form-view-elements.component.html',
  styleUrls: ['./form-view-elements.component.scss']
})
export class FormViewElementsComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
    _$ = $
  //A dirty way to make sure that the original user is making change
  //this field will be replaced with real credentials in next version
  //PWD = admin
  PASSWORD_PASS: string;

  //toggle to compose element part
  make_recipe = false;


  element: ElementModel = null;
  action: string;
  formAction = FormAction
  elementForm: ElementForm;
  categorys = [];

  @ViewChild('CATEGORY_ADD_FIELD') CATEGORY_ADD_FIELD:ElementRef;

  constructor(private router: Router,
    private cdRef:ChangeDetectorRef,
    private acrouter: ActivatedRoute,
    public elementsService: ElementsService,
    public categorysSizeService: CategorySizeService) { 
    
      //get categorys
    this.categorysSizeService.categorysSizesSubject
    .subscribe(res=> {this.categorys = (res)?res.categorys:[]})
  
      //init the form
    this.elementForm = new ElementForm( null );

    //get action form mode and element to update if exist
    this.acrouter.queryParams.subscribe(params=>{
      this.action = params['action']

      if( params['element'] != null )
      this.element = JSON.parse( atob(params['element']) )
      this.elementForm = new ElementForm( this.element )
    })

  }
  
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges()
  }

  ngOnDestroy(): void {
    $(".on-enter-modal-password-e").modal('hide')
    $(".on-action-modal").modal('hide')
    $(".on-action-modal").remove()
    $(".on-enter-modal-password-e").remove()
    $(".make-category-1").remove()
  }

  ngAfterViewInit(): void {
    //the element is null, if its not in update mode
    if( this.action == FormAction.CREATE ) this.element = null;
    //init the dropdown category
    this.setSelectedCategorys()
    //modal that show the user they r something happening
    $(".on-action-modal").modal({closable:false})
    //form view need permission to access
    $(".on-enter-modal-password-e").modal({closable: false})

    $(".make-category-1").modal()
    //verify permission
    this.openVerifCredentials()


  //no need to form to validate category and size add
  //only one field will be watched and validated by the api
  //if everything is okay than we can save it, otherwise no
  //requests will be sended on change value with a debounce time 350ms
  //Rxjs tool
    this.elementForm.watchNewCategoryField(this.CATEGORY_ADD_FIELD, this.categorysSizeService).subscribe()

  }
  
  ngOnInit(): void {
  }

  onFileChanged(event){
    //select the file
    let selectedFile = event.target.files[0];
    //make a file reader
    const fr = new FileReader()
    //read the value
    fr.readAsDataURL( selectedFile )

    fr.onload = () => {
      //put the value in the specific field form
      this.elementForm.elementForm.patchValue({image: fr.result})
      //show the image to user
      document.getElementById("current-image-element")['src'] = fr.result
    }
  }

  showImageFileUpload(){
    //image file upload is not displayed, it can be oppened with this way
    document.getElementById("image-file-upload-1").click()
  }

  // create or update element
  save( with_new = false ){
    $(".on-action-modal").modal('show')
    if( this.action == FormAction.CREATE){
      this.elementsService.createElement( this.makeElement() ).subscribe(res=>{
        $(".on-action-modal").modal('hide')
        if( !with_new )
          //create element and return to grid
          this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
        else{
          //create element and make other
          this.element = null
          this.elementForm = new ElementForm(null)
          $(".dropdown").dropdown('clear')
        }
      })
    }
    else{
      //update element and return to grid
      let element_up = this.makeElement()
      element_up.id = this.element.id
      this.elementsService.updateElement( element_up ).subscribe(res=>{
        $(".on-action-modal").modal('hide')
        this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
      })
    }
  }

  remove(){
    //show the user that they r something happening
    $(".on-action-modal").modal('show')
    //remove the product
    this.elementsService.removeElement( {id: this.element.id} ).subscribe(res=>{
      //hide the modal of notification
    $(".on-action-modal").modal('hide')
    //go back to grid
      this.router.navigate(['list'], {relativeTo: this.acrouter.parent})
    })
  }

  //create Element instance
  makeElement(){
    let t = new ElementModel()

    t.name = this.elementForm.getValue('name')
    t.kg_price = this.elementForm.getValue('kg_price')
    t.kg_buy_price = this.elementForm.getValue('kg_buy_price')
    t.kg_in_stock = this.elementForm.getValue('available')
    t.gramme_price = parseFloat( (t.kg_price / 1000 ).toFixed(2)  )
    t.description = this.elementForm.getValue('description')
    t.image = this.elementForm.getValue("image")
    t.elementCategorys = this.elementForm.getValue('category')
    .map(e=>this.categorys.filter(ct=> ct.id == e)[0])

    t.recipe = this.elementForm.getValue('recipe')
    return t
  }


  makeRecipe(event){
    let t = []

    event.forEach( e=>{
      let item = new RecipeModel()
      item.grammes = parseFloat( e.grammes )
      item.ingredient = e.ingredient
      item.id = e.id
      t.push( item )
    })
    
    this.elementForm.elementForm.patchValue({recipe: t })
  }

  credentialVerif(){
    let t = (this.PASSWORD_PASS == "admin")
    if( t ){
      $(".on-enter-modal-password-e").modal('hide')
      localStorage.setItem("action-user-verif", "1")
    }
  }
  openVerifCredentials(){
    let t = localStorage.getItem("action-user-verif")
    if( !t )
    $(".on-enter-modal-password-e").modal('show')
  }


  setSelectedCategorys(){
    //init dropdown
    $(".dropdown").dropdown()

    //any change in category dropdown will be setted in the form
    $("#categoryelement-product-dropdown").dropdown({
      onChange: (e)=>{
        let t  = ( e == "" )?[]: e.split(",")
        this.elementForm.elementForm.patchValue({category: t })
      }
    })
    
    //get categorys from element
    let categorys = this.element?.elementCategorys.map(e=>e.id.toString())

    //in toggle mode to recipe, category will lost values, it will be resetted by the form
    let cat2 = this.elementForm.getValue('category')?.map(e=> e.toString() )

    //it can be the form is null, so look from element, otherwise they will be any category
    cat2 = (cat2 && cat2.length>0)?cat2:categorys
    
    //set the values
    $("#categoryelement-product-dropdown").dropdown('set selected', cat2)
  }

  closeRecipePart(){
    //hide recipe part
    this.make_recipe = false

    //after closing recipe, the form lose values
    //dirty way to reset everything, a timeout will be setted
    //after dom will be setted of 50ms, all values will be present
    setTimeout( ()=>{
      this.setSelectedCategorys()
    }, 25)

  }

//save new category
  saveCategory(){
    $(".on-action-modal").modal('show')
    let value = this.CATEGORY_ADD_FIELD.nativeElement.value
    this.categorysSizeService.saveCategory( new Category(value) )
    .subscribe( res=>{
      this.CATEGORY_ADD_FIELD.nativeElement.value = ""
      setTimeout( ()=> $(".modal").modal('hide'), 1050)
    })
  }
  
}
