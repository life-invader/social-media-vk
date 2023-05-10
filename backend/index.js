import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { authRouter } from './routers/auth.router.js';
import { userRouter } from './routers/user.router.js';
import { WebSocketServer } from 'ws';
import { postRouter } from './routers/post.router.js';

const { parsed } = dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('posts-images'));

app.use('/profile', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.get('/lok', (req, res) => {
  res.redirect('/kama');
});

await mongoose.connect(parsed.DB_URL);
const server = app.listen(parsed.PORT, () => {
  console.log(`Server is running on ${parsed.PORT} port`);
});

const wss = new WebSocketServer({ server });
wss.on('connection', (connection, { headers }) => {
  if (headers.cookie) {
    const tokenString = headers.cookie.split(';').find((item) => item.startsWith('token'));

    if (tokenString) {
      try {
        const token = tokenString.replace('token=', '');
        const decoded = jwt.verify(token, process.env.SALT);
        connection.userData = decoded;
      } catch {
        connection.close();
      }
    }
  }

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((item) => {
          return item.userData;
        }),
      }),
    );
  });

  connection.on('message', (data) => {
    const { recipientId, text } = JSON.parse(data.toString());
    console.log(message);

    [...wss.clients]
      .filter((client) => {
        client.id === recipientId;
      })
      .forEach((client) => {
        client.send(JSON.stringify({}));
      });
  });
});
