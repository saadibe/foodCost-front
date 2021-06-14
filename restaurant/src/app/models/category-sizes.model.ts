export class Category{
    public id: number;

    constructor( public label: string = "" ){}
 }
 
 export class Size{
    public id: number;

    constructor( public label: string = "" ){}
 }

 export class CategorySize{
     constructor(public categorys: Array<Category>, public sizes: Array<Size>){}
 }