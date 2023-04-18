export interface IDataSourceConnect {
  connect(): Promise<unknown>;
  disconnect(): Promise<void>;
}
