import { model, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    secondName: {
      type: String,
      required: true,
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
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(this.password, salt);
        this.password = passwordHash;
      },
      comparePassword(pwd) {
        return bcrypt.compareSync(pwd, this.password);
      },
    },
  },
);

export const UserModel = model('User', UserSchema);
