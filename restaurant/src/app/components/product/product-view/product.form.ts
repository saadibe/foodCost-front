import { ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { IDT } from "src/app/libs/IDT";
import { watchField } from "src/app/libs/rxtools";
import { ProductModel } from "src/app/models/product.model";
import { CategorySizeService } from "src/app/services/category-size/category-size.service";


export class ProductForm extends IDT{
    public productForm: FormGroup;
    private formBuilder: FormBuilder;

    public cantSaveNewCategory = true
    public cantSaveNewSize = true

    public existCategory = false
    public existSize = false

    constructor(private product: ProductModel){
        super();
        this.formBuilder = new FormBuilder();
        this.productForm = this.formBuilder.group({
            name: [this.getFromProduct('name'), Validators.required, ],
            type: [this.getFromProduct('type'), Validators.required],
            price: [this.getFromProduct('price'), Validators.required],
            discount:[this.getFromProduct('discount'), Validators.required],
            category:[this.getFromProduct('category', null), Validators.required],
            size:[this.getFromProduct('size', null), Validators.required],
            description:[this.getFromProduct('description')],
            image: [this.getFromProduct('image', null)],
            recipe:[this.getFromProduct('recipe', [])]
        })

    }
    getFromProduct(key, r: any =""){
        
        if( this.product == null )return r
        else return this.product[key]
    }
    getValue(key){
        return this.productForm.get(key).value
    }

    public VDT(e) {
        return this.IDT(this.productForm, e)
    }

    public requiredError( e ){
        return this.VDT( e ).touched && this.VDT( e ).desc?.required
    }
    public invalidError( e, type ){
        return this.VDT( e ).touched && this.VDT( e ).desc[type]
    }




    //watch change on category field to add, and find simialire in DB
    //if no we can save it, otherwise no
    public watchNewCategoryField(categoryField: ElementRef, categoryService: CategorySizeService){
        return new Observable( observer=>{
            watchField(categoryField).subscribe( value =>{
                if( value.length > 3 )
                    categoryService.categoryExist( value )
                    .subscribe( res => {
                        this.cantSaveNewCategory = (res == true)
                        observer.next(res)

                        if( res ){
                            this.existCategory = true
                            setTimeout( ()=>this.existCategory = false, 2500 )
                        }
                    })
                else
                    this.cantSaveNewCategory = true
            })            
        })
    }



    //watch change on size field to add, and find simialire in DB
    //if no we can save it, otherwise no
    public watchNewSizeField(sizeField: ElementRef, categoryService: CategorySizeService){
        return new Observable( observer=>{
            watchField(sizeField).subscribe( value =>{
                if( value.length > 3 )
                    categoryService.sizeExist( value )
                    .subscribe( res => {
                        this.cantSaveNewSize = (res == true)
                        observer.next(res)


                        if( res ){
                            this.existSize = true
                            setTimeout( ()=>this.existSize = false, 2500 )
                        }

                    })
                else
                    this.cantSaveNewSize = true
            })            
        })
    }

}
