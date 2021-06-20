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
    public created_at: string; //"2021-06-20 16:40"
    public label: string = "";
    public qrcode: string = "";
    public discount: number;
    public final_price: number;
    public customRecipes: Array<ConstructionItem> = new Array();
}