export interface IDBClient {
  connect: (url: string) => Promise<void>;
  disconnect: () => Promise<void>;
}
