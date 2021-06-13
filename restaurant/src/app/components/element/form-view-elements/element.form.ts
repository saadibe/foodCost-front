import { ElementModel } from 'src/app/models/elements.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDT } from "src/app/libs/IDT";


export class ElementForm extends IDT{
    public elementForm: FormGroup;
    private formBuilder: FormBuilder;

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
            image: [this.getFromElement('image', null)]
        })
    }

    getFromElement(key, r=""){
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
}