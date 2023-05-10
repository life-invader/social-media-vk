import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { PostModel } from '../models/post.model.js';
import { upload } from '../middleware/upload.js';
import { UserModel } from '../models/user.model.js';

export const postRouter = Router();

const getFeed = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' });
    }

    const { id } = jwt.verify(token, process.env.SALT);
    const { friends } = await UserModel.findById(id);

    const friendsPosts = await Promise.all(
      friends.map((friendId) =>
        PostModel.find({ user: friendId }).populate('user').sort({ createdAt: -1 }),
      ),
    );
    const myPosts = await PostModel.find({ user: id }).populate('user').sort({ createdAt: -1 });

    res.json(friendsPosts.concat(myPosts).flat());
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить ленту', error });
  }
};

const createPost = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' });
    }

    const { id } = jwt.verify(token, process.env.SALT);

    const doc = new PostModel({
      ...req.body,
      user: id,
      image: req.file && `http://localhost:${process.env.PORT}/${req.file.filename}`,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось создать статью', error });
  }
};

const getPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await PostModel.find({ user: id }).populate('user').sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить посты', error });
  }
};

postRouter.post('/', upload.single('image'), createPost);
postRouter.get('/feed', getFeed);
postRouter.get('/:id', getPosts);
