import { HeaderGrid } from "src/app/libs/grid.templates";

export const HEADERS = [
    new HeaderGrid("code", "id"),
    new HeaderGrid("élément", "name"),
    new HeaderGrid("catégorie", "elementCategorys"),
    new HeaderGrid("prix achat", "kg_buy_price"),
    new HeaderGrid("Prix/Kg", "kg_price"),
    new HeaderGrid("en stock", "kg_in_stock")
]