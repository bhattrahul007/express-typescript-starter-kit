import { DatabaseConnector, Datasource } from './../interface/DatabaseConnector';
import logger from './../../utils/Logger';
import mongoose from 'mongoose';

class MongoDBConfiguration implements DatabaseConnector {
    private key = 'mongodb';

    private replaceKey(str: string, key: string, val: string): string {
        return str.replace(key, val);
    }

    public getDatabaseKey(): string {
        return this.key;
    }

    public async connect({ url, dbname, username, password }: Datasource): Promise<void> {
        let uri = url;
        if (dbname) uri = this.replaceKey(uri, '<dbname>', dbname);
        if (username && password)
            uri = this.replaceKey(this.replaceKey(uri, '<username>', username), '<password>', password);
        try {
            logger.info('Connecting to mongodb database.');
            await mongoose.connect(uri);
            logger.info(`Successfully connected to mongodb database[${dbname}].`);
        } catch (error) {
            logger.error(error);
            process.exitCode = 1;
        }
    }
}

export default MongoDBConfiguration;
