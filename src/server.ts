import { MongoDBConfiguration, Dispatcher, Configurations } from './common';
import Express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from './utils/Logger';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

export type ServerOptions = {
    dispatchers?: Dispatcher[];
};

class Server {
    private app: Application;
    private config: Configurations;
    private dispatchers: Dispatcher[];

    constructor(config: Configurations, options?: ServerOptions) {
        this.config = config;
        this.app = Express();
        this.dispatchers = [...(options?.dispatchers || [])];
    }

    public applyMiddlewares(): void {
        this.app.use(helmet());
        this.app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({ limit: '30mb', extended: true }));
        this.app.use(compression());
    }

    public applyRequestDispatchers(): void {
        this.dispatchers.forEach((requestDispatcher) => {
            this.app.use(path.join('/v1/api', requestDispatcher.getPath()), requestDispatcher.getRouter());
        });
    }

    public applyErrorHandlers(): void {}

    public start() {
        const datasource = this.config.datasource;
        new MongoDBConfiguration().connect(datasource['mongodb']).then(() => {
            logger.info(
                `Starting OpenSchool application ['env':'${this.config.app.env}', 'port':'${this.config.app.port}'].`
            );
            this.app.listen(this.config.app.port, async () => {
                logger.info(`OpenSchool application is up and running at 'http://localhost:${this.config.app.port}'.`);
            });
        });
    }
}

export default Server;
