import { errorConvertor } from './middlewares/errorConvertor.middleware';
import { DataSourceOptions } from './common/datasource/datasource-types';
import MongoDBConnect from './common/datasource/mongoose-connect';
import { errorHandler } from './middlewares/error.middleware';
import globalConfig from './common/app-configuration';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import Logger from './common/logger';
import express from 'express';
import winston from 'winston';
import morgan from 'morgan';
import helmet from 'helmet';
import config from 'config';
import cors from 'cors';

class App {
  private static logger: winston.Logger;

  constructor() {
    globalConfig._app = express();
    App.logger = new Logger({ loggerLabel: 'Application: ', consoleLog: true })._logger;
  }

  private async initDatasouce() {
    const _options = config.get<DataSourceOptions>('datasource');
    globalConfig._connectionDB = await new MongoDBConnect(_options).connect();
  }

  private initMiddlewares(): void {
    globalConfig._app.use(helmet());
    globalConfig._app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    globalConfig._app.use(morgan('dev'));
    globalConfig._app.use(cors());
    globalConfig._app.use(cookieParser());
    globalConfig._app.use(express.json());
    globalConfig._app.use(express.urlencoded({ limit: '40mb', extended: true }));
    globalConfig._app.use(compression());
  }

  private initControllers() {
    globalConfig._controllers.forEach((controller) => {
      globalConfig._app.use(`/v1/api${controller.path}`, controller.router);
    });
  }

  async init() {
    await this.initDatasouce();

    // initializing middlewares
    this.initMiddlewares();

    // initializing controllers
    this.initControllers();

    globalConfig._app.use(errorConvertor);
    globalConfig._app.use(errorHandler);

    globalConfig._app.listen(globalConfig._port, async () => {
      App.logger.info('Application is started and its up and running...');
    });
  }
}

const app = new App();

app.init();
