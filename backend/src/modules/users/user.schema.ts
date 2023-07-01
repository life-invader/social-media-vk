import mongoose, { Types } from 'mongoose';
import { comparePassword, hashPassword } from '../../utils/password.js';
import type { IUser } from '../../types/user.type.js';

interface UserDocumentMethods {
  hashPassword: () => void;
  comparePassword: (password: string) => void;
}

export interface UserDocument extends IUser, UserDocumentMethods, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    },
    password: {
      type: String,
      required: true,
      minLength: [5, 'Password must be more than 4 chars length'],
    },
    firstName: {
      type: String,
      required: true,
      minLength: [2, 'Name must be at least 2 chars length'],
    },
    secondName: {
      type: String,
      required: true,
      minLength: [2, 'Name must be at least 2 chars length'],
    },
    avatarUrl: {
      type: String,
      default: `${process.env.SERVER_URL}${process.env.PORT}/unya.jpg`,
    },
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    methods: {
      hashPassword() {
        this.password = hashPassword(this.password);
      },
      comparePassword(password: string) {
        return comparePassword(password, this.password);
      },
    },
  },
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
