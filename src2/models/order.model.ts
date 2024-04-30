import { Product } from './product.model';

export interface Order {
  userId: string;
  products: { product: Product; quantity: number }[];
  totalPrice: number;
}
