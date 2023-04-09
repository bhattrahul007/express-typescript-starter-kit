import MongoDBConnector from './common/database/MongoDBConnector';
import { RequestDispatcher } from './common/interface';
import { Configurations } from './common/settings';
import Express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from './utils/Logger';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

export type ServerOptions = {
    requestDispatchers: RequestDispatcher[];
};

class Server {
    private __configuration: Configurations;
    private __requestDispatcher: RequestDispatcher[];
    private __application: Application;

    constructor(
        config: Configurations,
        options: ServerOptions = { requestDispatchers: [] }
    ) {
        this.__configuration = config;
        this.__application = Express();
        this.__requestDispatcher = options.requestDispatchers;
    }

    public applyMiddlewares(): void {
        this.__application.use(helmet());
        this.__application.use(
            helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })
        );
        this.__application.use(morgan('dev'));
        this.__application.use(cors());
        this.__application.use(cookieParser());
        this.__application.use(Express.json());
        this.__application.use(
            Express.urlencoded({ limit: '30mb', extended: true })
        );
        this.__application.use(compression());
    }

    public applyRequestDispatchers(): void {
        this.__requestDispatcher.forEach((requestDispatcher) => {
            this.__application.use(
                path.join('/v1/api', requestDispatcher.getPath()),
                requestDispatcher.getRouter()
            );
        });
    }

    public applyErrorHandlers(): void {}

    public start() {
        if (this.__configuration.mongodb) {
            const { ...datasourceConfig } = this.__configuration.mongodb;
            new MongoDBConnector(datasourceConfig).connect().then(() => {
                logger.info(
                    `Trying to Start the server ["env":${this.__configuration.app.env}, 
                        "port": ${this.__configuration.app.port}]`
                );
                this.__application.listen(this.__configuration.app.port, () => {
                    logger.info('Server connection successfully.');
                    logger.info(
                        `Server is up and running at 'http://localhost:${this.__configuration.app.port}'.`
                    );
                });
            });
        }
    }
}

export default Server;
