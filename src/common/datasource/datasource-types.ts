export interface DataSourceConnect {
  connect(): Promise<unknown>;
  disconnect(): Promise<void>;
}

export type DataSourceOptions = {
  type: 'mongodb' | 'mysql';
  host: string;
  port: number;
  dbname?: string;
  username?: string;
  password?: string;
};
