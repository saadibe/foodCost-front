import { ConstructionModel } from "./construction.model";

export class InvoiceConstruction{
    public id: number;
    public created_at: string;
    public old_price: number = 0;
    public final_price: number = 0;
    public global_discount: number = 0;
    public paymentType: string;
    public constructions: Array<ConstructionModel>;
}