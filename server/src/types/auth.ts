import { Request } from 'express';
import mongoose from 'mongoose';

export interface User {
  _id?: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

// export interface User {
//   _id?: string;
//   username: string;
//   password?: string; // Optional to exclude from responses for security
// }

// export interface AuthRequest extends Express.Request {
//   user?: User;
// }