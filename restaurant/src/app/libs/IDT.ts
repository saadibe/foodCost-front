import {  FormGroup } from '@angular/forms';
export class IDT{
    constructor(){}
    protected IDT(form: FormGroup, e){
        return{
            invalid: form.controls[e].invalid,
            dirty: form.controls[e].dirty,
            touched: form.controls[e].touched,
            error: form.controls[e].invalid &&( form.controls[e].dirty || form.controls[e].touched )?true:false,
            desc: ( form.controls[e].errors )?form.controls[e].errors:{}
        }
    }
}