import { Category } from './category-sizes.model';
import { RecipeModel } from './recipe.model';

export class ElementModel{

    public id: number
    public name: string
    public elementCategorys: Array<Category> = []
    public kg_buy_price: number
    public kg_price: number
    public kg_in_stock: number
    public components: Array<string> = []
    public description: string
    public image: string
    public gramme_price: number = 0
    public recipe: Array<RecipeModel> = []
    public total_stock: number = 0

}