import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'Не авторизован' });
    }

    jwt.verify(token, process.env.SALT);
  } catch (error) {
    return res.status(403).json({ message: 'Не авторизован' });
  }

  next();
};
