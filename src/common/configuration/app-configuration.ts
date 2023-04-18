import DataSourceConfiguration from './datasource-configuration';
import ServerConfiguration from './server-configuration';
import express, { Express } from 'express';
import config from 'config';
import {
  IWebAppConfigurationOptions,
  IController,
  IWebAppConfiguration,
  IDataSourceConfiguration,
  IServerConfiguration,
} from './types';

class WebAppConfiguration implements IWebAppConfiguration {
  private web_server: Express = undefined as any;

  private server: ServerConfiguration;

  private datasource?: DataSourceConfiguration = undefined;

  private controllers: IController[];

  constructor(config: IWebAppConfigurationOptions) {
    this.web_server = express();
    this.server = new ServerConfiguration(config.server);
    this.controllers = config.controllers;
    if (config.datasource) {
      this.datasource = new DataSourceConfiguration(config.datasource);
    }
  }

  public async init() {}

  public getServer(): Express {
    return this.web_server;
  }

  public getControllers(): IController[] {
    return this.controllers;
  }

  public getDataSourceConfig(): IDataSourceConfiguration | undefined {
    return this.datasource;
  }

  public getServerConfig(): IServerConfiguration {
    return this.server;
  }
}

const _defaultConfig = config.get<IWebAppConfigurationOptions>('app');

const _webAppConfig = new WebAppConfiguration(_defaultConfig);

export { _webAppConfig, WebAppConfiguration };
