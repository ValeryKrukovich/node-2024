import { Product } from './product.model';

export interface Cart {
  userId: string;
  products: { product: Product; quantity: number }[];
}
