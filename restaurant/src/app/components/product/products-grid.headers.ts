import { HeaderGrid } from "src/app/libs/grid.templates";

export const HEADERS = [
  new HeaderGrid('code', 'id'),
  new HeaderGrid('produit', 'name'),
  new HeaderGrid('catégorie', 'productCategorys'),
  new HeaderGrid('taille', 'productSizes'),
  new HeaderGrid('type'),
  new HeaderGrid('prix actuel', 'actual_price'),
  new HeaderGrid('prix', 'price'),
  new HeaderGrid('remise', 'discount'),
  new HeaderGrid('en stock', 'total_stock')
];