import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
}

const ProductSchema = new Schema<IProduct>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
});

export const Product = model<IProduct>('Product', ProductSchema);
