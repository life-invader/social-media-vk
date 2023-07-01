import dotenv from 'dotenv';
import { AppConfig, type IConfigSchema } from './config.schema.js';
import type { ConfigInterface } from './config.interface.js';

export class Config implements ConfigInterface {
  config!: IConfigSchema;

  constructor() {
    const parsedConfig = dotenv.config();

    if (parsedConfig.error) {
      throw new Error('Error reading .env file!');
    }

    AppConfig.load({});
    AppConfig.validate({});
    this.config = AppConfig.getProperties();
    console.log('.env file successfully parsed!');
  }

  get<T extends keyof IConfigSchema>(key: T) {
    return this.config[key];
  }
}
