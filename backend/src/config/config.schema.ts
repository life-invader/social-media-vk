import convict from 'convict';

export interface IConfigSchema {
  DB_URL: string;
  LOGIN: string;
  PWD: string;
  PORT: number;
  SALT: string;
  CLIENT_URL: string;
  SERVER_URL: string;
}

export const AppConfig = convict<IConfigSchema>({
  DB_URL: {
    doc: 'Database URL',
    format: String,
    default: null,
    env: 'DB_URL',
  },
  LOGIN: {
    doc: 'Admin login',
    format: String,
    default: null,
    env: 'LOGIN',
  },
  PWD: {
    doc: 'Admin password',
    format: String,
    default: null,
    env: 'PWD',
  },
  PORT: {
    doc: 'Server port',
    format: Number,
    default: 7000,
    env: 'PORT',
  },
  SALT: {
    doc: 'Salt for hashing password',
    format: String,
    default: null,
    env: 'SALT',
  },
  CLIENT_URL: {
    doc: 'Client URL for configuring CORS',
    format: String,
    default: 'http://localhost:3000',
    env: 'CLIENT_URL',
  },
  SERVER_URL: {
    doc: 'Soon',
    format: String,
    default: 'http://localhost:',
    env: 'SERVER_URL',
  },
});
