import mongoose from 'mongoose';
import type { IDBClient } from './database.interface.js';

export class DBClient implements IDBClient {
  async connect(url: string) {
    await mongoose.connect(url);
    console.log('MongoDB connected!');
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('MongoDB disconnected!');
  }
}
