import { IDataSourceConfiguration, IDataSourceOptions, IDatabaseTypes } from './types';

class DataSourceConfiguration implements IDataSourceConfiguration {
  private driverType: IDatabaseTypes;
  private host: string;
  private port: number;
  private dbname: string;
  private username: string;
  private password: string;

  constructor(opt: IDataSourceOptions) {
    this.driverType = opt.type;
    this.host = opt.host;
    this.port = opt.port;
    this.dbname = opt.dbname || '';
    this.username = opt.username || '';
    this.password = opt.password || '';
  }

  getDriverType(): IDatabaseTypes {
    return this.driverType;
  }

  getHost(): string {
    return this.host;
  }

  getPort(): number {
    return this.port;
  }

  getDatabaseName(): string {
    return this.dbname;
  }
  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
}

export default DataSourceConfiguration;
