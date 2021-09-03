import {Product} from "../../product/types";

export interface CartProduct {
  id: string;
  product: Product;
  quantity: number;
  size: string;
}
