import { DataSourceConnect, DataSourceOptions } from './datasource-types';
import mongoose from 'mongoose';
import Logger from './../logger';

class MongoDBConnect implements DataSourceConnect {
  private static logger = new Logger({ loggerLabel: 'MongoDB: ', consoleLog: true })._logger;

  private type: 'mongodb' | 'mysql';
  private host: string;
  private port: number;
  private dbname: string;
  private username: string;
  private password: string;

  connection?: typeof mongoose;

  constructor(options: DataSourceOptions) {
    this.type = options.type;
    this.host = options.host;
    this.port = options.port;
    this.dbname = options.dbname || '';
    this.username = options.username || '';
    this.password = options.password || '';
  }

  private constructMongoDBUri() {
    return `${this.type}://${this.username ? this.username + ':' : ''}${
      this.password ? this.password + '@' : ''
    }${this.host}/${this.dbname ? this.dbname : ''}`;
  }

  async connect(): Promise<unknown> {
    try {
      const uriToConnect = this.constructMongoDBUri();

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
