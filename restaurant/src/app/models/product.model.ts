import { Category, Size } from "./category-sizes.model";
import { RecipeIngredient } from "./elements.model";

export class ProductRecipe{
   public id: number;
   public grammes: number;
   public ingredient: RecipeIngredient;
}

export class ProductModel{
   
   public id: number;
   public name: string;
   public productCategorys = new Array<Category>();
   public productSizes = new Array<Size>();
   public type: string;
   public price: number;
   public actual_price: number;
   public discount: number;
   public total_stock: number;
   public description: string;
   public image: FormData|Blob;
   public popularity: number = 0;
   public rating: number = 0;
   public saled_times: number = 0;
   public recipe = new Array<ProductRecipe>();
}