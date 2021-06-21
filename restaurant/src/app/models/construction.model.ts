export interface ItemId{
    id: number;
    name?: string;
    image?: string;
}

export class ConstructionItem{

    constructor(
        public grammes: number,
        public gramme_price: number,
        public ingredient: ItemId,
        public product: ItemId
    ){}
    
}

export class ConstructionModel{
    public confirmed: boolean = false
    public id: number;
    public label: string = "";
    public discount: number;
    public old_price: number;
    public final_price: number;
    public customRecipes: Array<ConstructionItem> = new Array();
    public invoice: ItemId = null
}