import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { UserModel } from '../models/user.model.js';

export const userRouter = Router();

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFriend = async (req, res) => {
  try {
    const { id: friendId } = req.params; // id будущего друга
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' });
    }

    const { id: myId } = jwt.verify(token, process.env.SALT);

    await UserModel.findByIdAndUpdate(friendId, { $addToSet: { friends: myId } }); // обновление друга
    await UserModel.findByIdAndUpdate(myId, { $addToSet: { friends: friendId } }); // обновление меня

    res.status(200).send();
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFriend = async (req, res) => {
  throw new Error('Not implemented!');
};

const getFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user.friends);
  } catch (error) {
    res.status(500).json(error);
  }
};

userRouter.get('/:id', getProfile);
userRouter.get('/:id/friends', getFriends);
userRouter.post('/friends/:id', addFriend);
userRouter.delete('/friends/:id', deleteFriend);
