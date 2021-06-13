import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDT } from "src/app/libs/IDT";
import { ProductModel } from "src/app/models/product.model";


export class ProductForm extends IDT{
    public productForm: FormGroup;
    private formBuilder: FormBuilder;

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
}
