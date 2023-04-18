import { AppConfigurationOptions } from './types';
import { Express } from 'express';
import config from 'config';

class AppConfiguration {
  public _app: Express = undefined as any;

  public _port: number;

  public _connectionDB: unknown;

  public _controllers;

  constructor(config: AppConfigurationOptions) {
    this._port = config.port;
    this._controllers = config.controllers;
  }
}

const _predefinedAppConfig = config.get<AppConfigurationOptions>('app');

const appConfig = new AppConfiguration(_predefinedAppConfig);

export default appConfig;
