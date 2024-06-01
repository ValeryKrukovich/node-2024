import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);
  