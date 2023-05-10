import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { UserModel } from '../models/user.model.js';

export const authRouter = Router();

const register = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const user = new UserModel(req.body);
    user.hashPassword();
    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        name: `${user.firstName} ${user.secondName}`,
      },
      process.env.SALT,
      { expiresIn: '1h' },
    );

    res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).populate('friends');

    if (!user) {
      return res.status(400).json({ message: 'Такого пользователя не существует' });
    }
    const isPasswordCorrect = user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: `${user.firstName} ${user.secondName}`,
      },
      process.env.SALT,
      { expiresIn: '1h' },
    );

    res.cookie('token', token, { sameSite: 'none', secure: true }).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const checkLogin = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' });
    }

    const decoded = jwt.verify(token, process.env.SALT);
    const user = await UserModel.findById(decoded.id).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(403).json({ message: 'Не авторизован' });
  }
};

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/login', checkLogin);
