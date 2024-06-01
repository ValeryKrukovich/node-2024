import { Schema, model, Document } from 'mongoose';

interface ICart extends Document {
  id: string;
  userId: string;
  products: { productId: string, quantity: number }[];
  deleted: boolean;
}

const CartSchema = new Schema<ICart>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  deleted: { type: Boolean, default: false },
});

export const Cart = model<ICart>('Cart', CartSchema);
