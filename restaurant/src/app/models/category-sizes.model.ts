export class Category{
    constructor(public id: number = 0, public label: string = ""){}
 }
 export class Size{
     constructor(public id: number = 0, public label: string = ""){}
 }
 export class CategorySize{
     constructor(public categorys: Array<Category>, public sizes: Array<Size>){}
 }