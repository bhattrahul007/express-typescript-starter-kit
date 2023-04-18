import { IDataSourceConfiguration } from '../configuration';
import { IDataSourceConnect } from './datasource-types';
import mongoose from 'mongoose';
import Logger from './../logger';

class MongoDBConnect implements IDataSourceConnect {
  private static logger = new Logger({ loggerLabel: 'MongoDB: ', consoleLog: true })._logger;
  private datasource: IDataSourceConfiguration;

  connection?: typeof mongoose;

  constructor(datasource: IDataSourceConfiguration) {
    this.datasource = datasource;
  }

  private constructMongoDBUri() {
    return `${this.datasource.getDriverType()}://${
      this.datasource.getUsername() ? this.datasource.getUsername() + ':' : ''
    }${
      this.datasource.getPassword() ? this.datasource.getPassword() + '@' : ''
    }${this.datasource.getHost()}:${this.datasource.getPort()}/${
      this.datasource.getDatabaseName() ? this.datasource.getDatabaseName() : ''
    }`;
  }

  async connect(): Promise<unknown> {
    try {
      const uriToConnect = this.constructMongoDBUri();
      MongoDBConnect.logger.info(uriToConnect);
      MongoDBConnect.logger.info('Trying to connect with Mongodb server...');
      const connection = await mongoose.connect(uriToConnect);
      MongoDBConnect.logger.info('ConnSuccess: Successfully connected with Mongodb server...');

      return connection;
    } catch (error) {
      MongoDBConnect.logger.error('ConnError: ', error);
      if (this.connection) {
        this.disconnect();
      }
      MongoDBConnect.logger.error('Cleaning up database connections...');
      process.exit(0);
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.disconnect();
      this.connection = undefined;
    }
  }
}

export default MongoDBConnect;
