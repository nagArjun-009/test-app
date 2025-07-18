import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../types/auth';

interface UserDocument extends User, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: 'users', // Explicitly set collection name
  }
);

export default mongoose.model<UserDocument>('User', userSchema, 'users');
