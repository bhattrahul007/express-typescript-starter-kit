import logger from './../../utils/Logger';
import mongoose from 'mongoose';
import {
    DatabaseConnector,
    DatasourceConfiguration,
} from './DatabaseConnector';

class MongoDBConnector implements DatabaseConnector {
    private __url: string;
    private __databaseName?: string;
    private __username?: string;
    private __password?: string;

    constructor(datasource: DatasourceConfiguration) {
        logger.info(`Intializing and Configuration MongoDBConnector`);
        this.__url = datasource.databaseUrl;
        this.__databaseName = datasource.databaseName;
        this.__username = datasource.username;
        this.__password = datasource.password;
        logger.info(`MongoDB configured successfully.`);
    }

    async connect(): Promise<void> {
        if (this.__url) {
            try {
                let finalUrl = this.__url;
                if (this.__databaseName)
                    finalUrl = finalUrl.replace(
                        '<dbname>',
                        this.__databaseName
                    );
                if (this.__username && this.__password)
                    finalUrl = finalUrl
                        .replace('<username>', this.__username)
                        .replace('<password>', this.__password);

                logger.info(
                    `Trying to connect with MongoDB (${this.__databaseName}) server.`
                );
                await mongoose.connect(finalUrl);
                logger.info(
                    [
                        `MongoDB database connected successfully`,
                        `MongoDB(${this.__databaseName}) server is up and runnning.`,
                    ].join('.\n')
                );
            } catch (error) {
                logger.error(
                    [
                        `Error happened while connecting with mongodb server ["databaseName":${this.__databaseName}]`,
                        `Please pay attention to it and fix it as quickly as possible.`,
                    ].join('. ')
                );
                logger.error(error);
                process.exit(1);
            }
        }
    }
}

export default MongoDBConnector;
