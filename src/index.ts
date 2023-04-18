import { errorConvertor } from './middlewares/errorConvertor.middleware';
import { _webAppConfig, MongoDBConnect, Logger } from './common';
import { errorHandler } from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

class App {
  private static logger = new Logger({ loggerLabel: 'Application: ', consoleLog: true })._logger;

  private async initDatasouce() {
    const datasourceConfig = _webAppConfig.getDataSourceConfig();
    if (datasourceConfig) {
      await new MongoDBConnect(datasourceConfig).connect();
    }
  }

  private initMiddlewares(): void {
    _webAppConfig.getServer().use(helmet());
    _webAppConfig.getServer().use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
    _webAppConfig.getServer().use(morgan('dev'));
    _webAppConfig.getServer().use(cors());
    _webAppConfig.getServer().use(cookieParser());
    _webAppConfig.getServer().use(express.json());
    _webAppConfig.getServer().use(express.urlencoded({ limit: '40mb', extended: true }));
    _webAppConfig.getServer().use(compression());
  }

  private initControllers() {
    _webAppConfig.getControllers().forEach((controller) => {
      _webAppConfig.getServer().use(`/v1/api${controller.path}`, controller.router);
    });
  }

  async init() {
    await this.initDatasouce();

    // initializing middlewares
    this.initMiddlewares();

    // initializing controllers
    this.initControllers();

    _webAppConfig.getServer().use(errorConvertor);
    _webAppConfig.getServer().use(errorHandler);

    _webAppConfig.getServer().listen(_webAppConfig.getServerConfig().getPort(), async () => {
      App.logger.info('Application is started and its up and running...');
    });
  }
}

const app = new App();

app.init();
