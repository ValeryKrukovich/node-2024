import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  id: string;
  userId: string;
  products: { productId: string, name: string, price: number, quantity: number }[];
}

const OrderSchema = new Schema<IOrder>({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

export const Order = model<IOrder>('Order', OrderSchema);
