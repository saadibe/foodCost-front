import { Component, OnInit, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAction } from 'src/app/libs/ViewModes.enum';
import { ElementModel } from 'src/app/models/elements.model';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
import { ElementsService } from 'src/app/services/elements/elements.service';
import { ElementForm } from './element.form';
import { ChangeDetectorRef } from '@angular/core';


declare var $: any;
@Component({
  selector: 'form-view-elements',
  templateUrl: './form-view-elements.component.html',
  styleUrls: ['./form-view-elements.component.scss']
})
export class FormViewElementsComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  
  //A dirty way to make sure that the original user is making change
  //this field will be replaced with real credentials in next version
  //PWD = admin
  PASSWORD_PASS: string;

  element: ElementModel = null;
  action: string;
  formAction = FormAction
  elementForm: ElementForm;
  categorys = [];

  constructor(private router: Router,
    private cdRef:ChangeDetectorRef,
    private acrouter: ActivatedRoute,
    public elementsService: ElementsService,
    public categorysSizeService: CategorySizeService) { 
    
      //get categorys
    this.categorysSizeService.categorysSizesSubject
    .subscribe(res=> {this.categorys = (res)?res.categorys:[]})
  

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
  }

  ngAfterViewInit(): void {
    if( this.action == FormAction.CREATE ) this.element = null;

    $(".dropdown").dropdown()
    $("#categoryelement-product-dropdown").dropdown({
      onChange: (e)=>this.elementForm.elementForm.patchValue({category: e.split(",")})
    })
    $("#composecategory-dropdown").dropdown({
      onChange: (e)=>this.elementForm.elementForm.patchValue({components: e.split(",")})
    })

    let categorys = this.element?.elementCategorys.map(e=>e.id.toString())
  
    $("#categoryelement-product-dropdown").dropdown('set selected', categorys)
    $("#composecategory-dropdown").dropdown('set selected', this.element?.components)

    $(".on-action-modal").modal({closable:false})
    $(".on-enter-modal-password-e").modal({closable: false})
    this.openVerifCredentials()

  }

  ngOnInit(): void {
  }

  onFileChanged(event){
    let selectedFile = event.target.files[0];
    const fr = new FileReader()
    fr.readAsDataURL( selectedFile )
    fr.onload = () => {
      this.elementForm.elementForm.patchValue({image: fr.result})
      document.getElementById("current-image-element")['src'] = fr.result
    }
  }

  showImageFileUpload(){
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
    $(".on-action-modal").modal('show')
    this.elementsService.removeElement( {id: this.element.id} ).subscribe(res=>{
    $(".on-action-modal").modal('hide')
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


    return t
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
}
