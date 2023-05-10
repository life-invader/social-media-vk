import { Schema, model, Types } from 'mongoose';

const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: false,
    },
    image: String,
    likes: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const PostModel = model('Post', PostSchema);
