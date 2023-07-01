import type { IConfigSchema } from './config.schema.js';

export interface ConfigInterface {
  get<T extends keyof IConfigSchema>(key: T): IConfigSchema[T];
}
