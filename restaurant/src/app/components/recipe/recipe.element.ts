import { ElementModel } from "src/app/models/elements.model";

export class RecipeElement{
    constructor(
        public id: number,
        public element: any = null,
        public gramme: number = 0
    ){}
}