import { IWebAppConfigurationOptions } from '../src/common/configuration';

const main: IWebAppConfigurationOptions = {
  server: {
    env: 'development',
    host: 'http://locahost',
    port: 6001,
  },

  controllers: [],

  datasource: {
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    dbname: 'openschool',
  },
};

export default { app: main };
