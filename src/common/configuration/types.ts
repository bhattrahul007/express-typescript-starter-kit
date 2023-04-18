import { Router, Express } from 'express';

export type IDatabaseTypes = 'mongodb' | 'mysql';

export type NodeEnv = 'test' | 'development' | 'production';

export type IController = {
  router: Router;
  path: string;
};

export interface IServerConfiguration {
  getAppEnv(): NodeEnv;

  getPort(): number;

  getHost(): string;
}

export type IServerConfigurationOptions = {
  env: NodeEnv;

  port: number;

  host: string;
};

export interface IDataSourceConfiguration {
  getDriverType(): IDatabaseTypes;

  getHost(): string;

  getPort(): number;

  getDatabaseName(): string;

  getUsername(): string;

  getPassword(): string;
}

export type IDataSourceOptions = {
  type: IDatabaseTypes;
  host: string;
  port: number;
  dbname?: string;
  username?: string;
  password?: string;
};

export type IWebAppConfigurationOptions = {
  server: IServerConfigurationOptions;

  controllers: IController[];

  datasource?: IDataSourceOptions;
};

export interface IWebAppConfiguration {
  getServer(): Express;

  getServerConfig(): IServerConfiguration;

  getDataSourceConfig(): IDataSourceConfiguration | undefined;

  getControllers(): IController[];
}
