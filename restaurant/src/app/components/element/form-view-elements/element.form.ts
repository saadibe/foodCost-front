import { ElementModel } from 'src/app/models/elements.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDT } from "src/app/libs/IDT";
import { ElementRef } from '@angular/core';
import { CategorySizeService } from 'src/app/services/category-size/category-size.service';
import { Observable } from 'rxjs';
import { watchField } from 'src/app/libs/rxtools';


export class ElementForm extends IDT{
    public elementForm: FormGroup;
    private formBuilder: FormBuilder;

    public cantSaveNewCategory = true
    public existCategory = false

    constructor(private element: ElementModel){
        super();
        this.formBuilder = new FormBuilder();
        this.elementForm = this.formBuilder.group({
            name: [this.getFromElement('name'), Validators.required],
            kg_buy_price: [this.getFromElement('kg_buy_price'), Validators.required],
            kg_price:[this.getFromElement('kg_price'), Validators.required],
            category:[[], Validators.required],
            available:[this.getFromElement('kg_in_stock'), Validators.required],
            description:[this.getFromElement('description')],
            image: [this.getFromElement('image', null)],
            recipe: [this.getFromElement('recipe', [])]
        })
    }

    getFromElement(key, r: any = ""){
        if( this.element == null )return r
        else return this.element[key]
    }
    getValue(key){
        return this.elementForm.get(key).value
    }

    public VDT(e) {
        return this.IDT(this.elementForm, e)
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
}