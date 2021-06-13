import { ElementModel } from "src/app/models/elements.model";

export class Ingredient{
    public id: number;
    public name: string;

    constructor(id: number = 0, name: string = ""){}
}

export class RecipeElement{
    constructor(
        public id: number,
        public ingredient: Ingredient = null,
        public grammes: number = 0
    ){}
}