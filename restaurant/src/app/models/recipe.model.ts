export class RecipeIngredient{
    public id: number;
    public name: string;
}

export class RecipeModel{
    public id: number;
    public grammes: number;
    public ingredient: RecipeIngredient;
 }